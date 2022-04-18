// These are loaded as URL paths by a webpack loader
import coreContractAbi from 'common-contracts/abis/TinyWorld.json';
import type { TinyWorld } from 'common-contracts/typechain';
import { createContract, createEthConnection, EthConnection } from 'exgrasia-network';
import type { Contract, providers, Wallet } from 'ethers';

/**
 * Loads the Core game contract, which is responsible for updating the state of the game.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestCore.sol
 */
export async function loadCoreContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<TinyWorld> {
  return createContract<TinyWorld>(address, coreContractAbi, provider, signer);
}

export function getEthConnection(): Promise<EthConnection> {
  const isProd = process.env.NODE_ENV === 'production';
  const defaultUrl = process.env.DEFAULT_RPC as string;

  let url: string;

  if (isProd) {
    url = defaultUrl;
  } else {
    url = 'http://localhost:8545';
  }

  return createEthConnection(url);
}
