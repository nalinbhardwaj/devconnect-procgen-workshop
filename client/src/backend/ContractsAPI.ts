import { CORE_CONTRACT_ADDRESS } from 'common-contracts';
import {
  ProveTileContractCallArgs,
  TransitionTileContractCallArgs,
  Tile,
  TileType,
  WorldCoords,
  Awaited,
  address,
  EthAddress,
} from 'common-types';
import type { TinyWorld } from 'common-contracts/typechain';
import {
  ContractCaller,
  EthConnection,
  ethToWei,
  // QueuedTransaction,
  TxExecutor,
} from 'exgrasia-network';
import { EventEmitter } from 'events';
import {
  BigNumber as EthersBN,
  Contract,
  ContractFunction /*, ethers, Event, providers*/,
  providers,
} from 'ethers';
import {
  ContractsAPIEvent,
  SubmittedConfirmTile,
  SubmittedTx,
  UnconfirmedConfirmTile,
} from '../_types/ContractAPITypes';
import { loadCoreContract } from './Blockchain';

export type RawTile = Awaited<ReturnType<TinyWorld['getCachedTile(tuple)']>>;
export type RawCoords = Awaited<ReturnType<TinyWorld['playerLocation']>>;

export function decodeCoords(rawCoords: RawCoords): WorldCoords {
  return {
    x: rawCoords.x.toNumber(),
    y: rawCoords.y.toNumber(),
  };
}

/**
 * Roughly contains methods that map 1:1 with functions that live in the contract. Responsible for
 * reading and writing to and from the blockchain.
 *
 * @todo don't inherit from {@link EventEmitter}. instead use {@link Monomitter}
 */
export class ContractsAPI extends EventEmitter {
  /**
   * Don't allow users to submit txs if balance falls below this amount/
   */
  private static readonly MIN_BALANCE = ethToWei(0.002);

  /**
   * Instrumented {@link ThrottledConcurrentQueue} for blockchain reads.
   */
  private readonly contractCaller: ContractCaller;

  /**
   * Instrumented {@link ThrottledConcurrentQueue} for blockchain writes.
   */
  private readonly txExecutor: TxExecutor | undefined;

  /**
   * Our connection to the blockchain. In charge of low level networking, and also of the burner
   * wallet.
   */
  private ethConnection: EthConnection;

  get coreContract() {
    return this.ethConnection.getContract<TinyWorld>(CORE_CONTRACT_ADDRESS);
  }

  public constructor(ethConnection: EthConnection) {
    super();
    this.contractCaller = new ContractCaller();
    this.ethConnection = ethConnection;
    this.txExecutor = new TxExecutor(ethConnection, () => '1');

    this.setupEventListeners();
  }

  public destroy(): void {
    this.removeEventListeners();
  }

  private makeCall<T>(contractViewFunction: ContractFunction<T>, args: unknown[] = []): Promise<T> {
    return this.contractCaller.makeCall(contractViewFunction, args);
  }

  private async decodeTile(rawTile: RawTile): Promise<Tile> {
    const coords = decodeCoords(rawTile.coords);
    return {
      coords: coords,
      perlin: [rawTile.perlin[0].toNumber(), rawTile.perlin[1].toNumber()],
      raritySeed: rawTile.raritySeed.toNumber(),
      tileType: rawTile.tileType,
    };
  }

  public async setupEventListeners(): Promise<void> {
    const { coreContract } = this;
  }

  public removeEventListeners(): void {
    const { coreContract } = this;
  }

  public async getSeed(): Promise<number> {
    return (await this.makeCall<EthersBN>(this.coreContract.seed)).toNumber();
  }

  public async getWorldScale(): Promise<number> {
    return (await this.makeCall<EthersBN>(this.coreContract.worldScale)).toNumber();
  }

  public async getWorldWidth(): Promise<number> {
    return (await this.makeCall<EthersBN>(this.coreContract.worldWidth)).toNumber();
  }

  public async getTouchedTiles(): Promise<Tile[]> {
    const touchedTiles = await this.makeCall<RawTile[]>(this.coreContract.getTouchedTiles);

    return Promise.all(touchedTiles.map(async (rawTile) => await this.decodeTile(rawTile)));
  }

  public async confirmTile(action: UnconfirmedConfirmTile) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      action.methodName,
      [action.tile.coords, action.tile.tileType]
    );
    const unminedConfirmTileTx: SubmittedConfirmTile = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedConfirmTileTx, tx.confirmed);
  }

  /**
   * Given an unconfirmed (but submitted) transaction, emits the appropriate
   * [[ContractsAPIEvent]].
   */
  public waitFor(submitted: SubmittedTx, receiptPromise: Promise<providers.TransactionReceipt>) {
    this.emit(ContractsAPIEvent.TxSubmitted, submitted);

    return receiptPromise
      .then((receipt) => {
        this.emit(ContractsAPIEvent.TxConfirmed, submitted);
        return receipt;
      })
      .catch((e) => {
        this.emit(ContractsAPIEvent.TxReverted, submitted, e);
        throw e;
      });
  }
}

export async function makeContractsAPI(ethConnection: EthConnection): Promise<ContractsAPI> {
  // Could turn this into an array and iterate, but I like the explicitness
  await ethConnection.loadContract(CORE_CONTRACT_ADDRESS, loadCoreContract);

  return new ContractsAPI(ethConnection);
}
