import { EthAddress, Tile, TileType, WorldCoords } from 'common-types';

export enum ContractMethodName {
  CONFIRM_TILE = 'confirmTile',
}

export const enum ContractsAPIEvent {
  TxInitFailed = 'TxInitFailed',
  TxSubmitted = 'TxSubmitted',
  TxConfirmed = 'TxConfirmed',
  TxReverted = 'TxReverted',
}

export type TxIntent = {
  // we generate a txId so we can reference the tx
  // before it is submitted to chain and given a txHash
  actionId: string;
  methodName: ContractMethodName | string;
};

export type SubmittedTx = TxIntent & {
  txHash: string;
  sentAtTimestamp: number;
};

export type UnconfirmedConfirmTile = TxIntent & {
  methodName: ContractMethodName.CONFIRM_TILE;
  tile: Tile;
};

export type SubmittedConfirmTile = UnconfirmedConfirmTile & SubmittedTx;

export function isUnconfirmedConfirmTile(txIntent: TxIntent): txIntent is UnconfirmedConfirmTile {
  return ContractMethodName.CONFIRM_TILE == txIntent.methodName;
}
