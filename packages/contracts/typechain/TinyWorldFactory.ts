/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { TinyWorld } from "./TinyWorld";

export class TinyWorldFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TinyWorld> {
    return super.deploy(overrides || {}) as Promise<TinyWorld>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TinyWorld {
    return super.attach(address) as TinyWorld;
  }
  connect(signer: Signer): TinyWorldFactory {
    return super.connect(signer) as TinyWorldFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TinyWorld {
    return new Contract(address, _abi, signerOrProvider) as TinyWorld;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum TileType",
        name: "tileType",
        type: "uint8",
      },
    ],
    name: "TileProved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "getCachedTile",
    outputs: [
      {
        internalType: "enum TileType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_seed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_worldWidth",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[4]",
        name: "publicSignals",
        type: "uint256[4]",
      },
    ],
    name: "proveTile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "worldWidth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506107e5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063cd28e8cb1161005b578063cd28e8cb146100d7578063e4a30116146100ea578063f276dc89146100fd578063f2fde38b1461013857600080fd5b80634400d97e1461008d578063715018a6146100a95780637d94792a146100b35780638da5cb5b146100bc575b600080fd5b61009660665481565b6040519081526020015b60405180910390f35b6100b161014b565b005b61009660655481565b6033546040516001600160a01b0390911681526020016100a0565b6100b16100e53660046105c6565b6101b6565b6100b16100f83660046106b0565b610261565b61012b61010b3660046106b0565b600091825260676020908152604080842092845291905290205460ff1690565b6040516100a091906106d1565b6100b1610146366004610598565b6102e1565b6033546001600160a01b031633146101aa5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6101b460006103ac565b565b805160208201516040830151606084015160665484106101d557600080fd5b60665483106101e357600080fd5b60655482146101f157600080fd5b80600281111561021157634e487b7160e01b600052602160045260246000fd5b60008581526067602090815260408083208784529091529020805460ff1916600183600281111561025257634e487b7160e01b600052602160045260246000fd5b02179055505050505050505050565b600054610100900460ff168061027a575060005460ff16155b6102965760405162461bcd60e51b81526004016101a1906106f9565b600054610100900460ff161580156102b8576000805461ffff19166101011790555b6102c06103fe565b6065839055606682905580156102dc576000805461ff00191690555b505050565b6033546001600160a01b0316331461033b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101a1565b6001600160a01b0381166103a05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101a1565b6103a9816103ac565b50565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1680610417575060005460ff16155b6104335760405162461bcd60e51b81526004016101a1906106f9565b600054610100900460ff16158015610455576000805461ffff19166101011790555b61045d610479565b6104656104e3565b80156103a9576000805461ff001916905550565b600054610100900460ff1680610492575060005460ff16155b6104ae5760405162461bcd60e51b81526004016101a1906106f9565b600054610100900460ff16158015610465576000805461ffff191661010117905580156103a9576000805461ff001916905550565b600054610100900460ff16806104fc575060005460ff16155b6105185760405162461bcd60e51b81526004016101a1906106f9565b600054610100900460ff1615801561053a576000805461ffff19166101011790555b610465336103ac565b600082601f830112610553578081fd5b61055b610747565b80838560408601111561056c578384fd5b835b600281101561058d57813584526020938401939091019060010161056e565b509095945050505050565b6000602082840312156105a9578081fd5b81356001600160a01b03811681146105bf578182fd5b9392505050565b6000806000806101808086880312156105dd578384fd5b6105e78787610543565b9450604087605f8801126105f9578485fd5b610601610747565b8082890160c08a018b811115610615578889fd5b885b600281101561063e5761062a8d84610543565b855260209094019391850191600101610617565b5082985061064c8c82610543565b975050505050508661011f870112610662578182fd5b61066a61077e565b80610100880189848a01111561067e578485fd5b8493505b60048410156106a257803583526001939093019260209283019201610682565b509598949750929550505050565b600080604083850312156106c2578182fd5b50508035926020909101359150565b60208101600383106106f357634e487b7160e01b600052602160045260246000fd5b91905290565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b6040805190810167ffffffffffffffff8111828210171561077857634e487b7160e01b600052604160045260246000fd5b60405290565b6040516080810167ffffffffffffffff8111828210171561077857634e487b7160e01b600052604160045260246000fdfea2646970667358221220c55243df1a9cb7d931afdbec656f201afe3f75fb831aa899b92e959a1060ab2f64736f6c63430008040033";