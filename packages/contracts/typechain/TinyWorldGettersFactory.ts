/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { TinyWorldGetters } from "./TinyWorldGetters";

export class TinyWorldGettersFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TinyWorldGetters> {
    return super.deploy(overrides || {}) as Promise<TinyWorldGetters>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TinyWorldGetters {
    return super.attach(address) as TinyWorldGetters;
  }
  connect(signer: Signer): TinyWorldGettersFactory {
    return super.connect(signer) as TinyWorldGettersFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TinyWorldGetters {
    return new Contract(address, _abi, signerOrProvider) as TinyWorldGetters;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_coreContractAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610183806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063c4d66de814610030575b600080fd5b61004361003e36600461011f565b610045565b005b600054610100900460ff168061005e575060005460ff16155b6100c55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b600054610100900460ff161580156100e7576000805461ffff19166101011790555b6000805462010000600160b01b031916620100006001600160a01b03851602179055801561011b576000805461ff00191690555b5050565b600060208284031215610130578081fd5b81356001600160a01b0381168114610146578182fd5b939250505056fea264697066735822122096ccd925a7fb34351cc14bb1ebbd8059a2ac2e93e68fc58e41486aee6289b2f064736f6c63430008040033";