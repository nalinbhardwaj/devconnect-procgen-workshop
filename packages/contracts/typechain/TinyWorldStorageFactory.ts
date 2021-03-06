/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { TinyWorldStorage } from "./TinyWorldStorage";

export class TinyWorldStorageFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TinyWorldStorage> {
    return super.deploy(overrides || {}) as Promise<TinyWorldStorage>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TinyWorldStorage {
    return super.attach(address) as TinyWorldStorage;
  }
  connect(signer: Signer): TinyWorldStorageFactory {
    return super.connect(signer) as TinyWorldStorageFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TinyWorldStorage {
    return new Contract(address, _abi, signerOrProvider) as TinyWorldStorage;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cachedTiles",
    outputs: [
      {
        components: [
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
        internalType: "struct Coords",
        name: "coords",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "raritySeed",
        type: "uint256",
      },
      {
        internalType: "enum TileType",
        name: "tileType",
        type: "uint8",
      },
      {
        internalType: "enum TemperatureType",
        name: "temperatureType",
        type: "uint8",
      },
      {
        internalType: "enum AltitudeType",
        name: "altitudeType",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
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
        internalType: "struct Coords",
        name: "coords",
        type: "tuple",
      },
    ],
    name: "getCachedTile",
    outputs: [
      {
        components: [
          {
            components: [
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
            internalType: "struct Coords",
            name: "coords",
            type: "tuple",
          },
          {
            internalType: "uint256[2]",
            name: "perlin",
            type: "uint256[2]",
          },
          {
            internalType: "uint256",
            name: "raritySeed",
            type: "uint256",
          },
          {
            internalType: "enum TileType",
            name: "tileType",
            type: "uint8",
          },
          {
            internalType: "enum TemperatureType",
            name: "temperatureType",
            type: "uint8",
          },
          {
            internalType: "enum AltitudeType",
            name: "altitudeType",
            type: "uint8",
          },
        ],
        internalType: "struct Tile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTouchedTiles",
    outputs: [
      {
        components: [
          {
            components: [
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
            internalType: "struct Coords",
            name: "coords",
            type: "tuple",
          },
          {
            internalType: "uint256[2]",
            name: "perlin",
            type: "uint256[2]",
          },
          {
            internalType: "uint256",
            name: "raritySeed",
            type: "uint256",
          },
          {
            internalType: "enum TileType",
            name: "tileType",
            type: "uint8",
          },
          {
            internalType: "enum TemperatureType",
            name: "temperatureType",
            type: "uint8",
          },
          {
            internalType: "enum AltitudeType",
            name: "altitudeType",
            type: "uint8",
          },
        ],
        internalType: "struct Tile[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "perlinMax",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "touchedCoords",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vecs",
    outputs: [
      {
        internalType: "int16",
        name: "",
        type: "int16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vecsDenom",
    outputs: [
      {
        internalType: "int16",
        name: "",
        type: "int16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "worldScale",
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
  "0x608060405234801561001057600080fd5b506107fb806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063b03395ec11610066578063b03395ec14610122578063bf44026d1461014a578063d13e4f281461016a578063ea58cb2314610173578063fc9cbb361461018857600080fd5b80634400d97e146100a357806347b1361b146100bf5780634c6179b8146100df5780637d94792a146100f25780637dc3feb1146100fb575b600080fd5b6100ac60015481565b6040519081526020015b60405180910390f35b6013546100cc9060010b81565b60405160019190910b81526020016100b6565b6100cc6100ed3660046105fc565b610200565b6100ac60005481565b60135461010f9062010000900461ffff1681565b60405161ffff90911681526020016100b6565b6101356101303660046105e4565b61023f565b604080519283526020830191909152016100b6565b61015d61015836600461058a565b61026d565b6040516100b69190610773565b6100ac60025481565b61017b6103ef565b6040516100b691906106db565b6101ef6101963660046105fc565b6014602090815260009283526040808420825291835291819020815180830190925280548252600181015492820192909252600482015460059092015490919060ff808216916101008104821691620100009091041685565b6040516100b695949392919061072a565b6003826010811061021057600080fd5b01816002811061021f57600080fd5b60109182820401919006600202915091509054906101000a900460010b81565b6015818154811061024f57600080fd5b60009182526020909120600290910201805460019091015490915082565b610275610501565b81516000908152601460209081526040808320828601518452825291829020825161010081018452815460c08201908152600183015460e083015281528351808501948590529093919284019160028085019182845b8154815260200190600101908083116102cb57505050918352505060048201546020820152600582015460409091019060ff16600b81111561031d57634e487b7160e01b600052602160045260246000fd5b600b81111561033c57634e487b7160e01b600052602160045260246000fd5b81526020016005820160019054906101000a900460ff16600281111561037257634e487b7160e01b600052602160045260246000fd5b600281111561039157634e487b7160e01b600052602160045260246000fd5b81526020016005820160029054906101000a900460ff1660048111156103c757634e487b7160e01b600052602160045260246000fd5b60048111156103e657634e487b7160e01b600052602160045260246000fd5b90525092915050565b60155460609060009067ffffffffffffffff81111561041e57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561045757816020015b610444610501565b81526020019060019003908161043c5790505b50905060005b6015548110156104fb576104bd6015828154811061048b57634e487b7160e01b600052603260045260246000fd5b90600052602060002090600202016040518060400160405290816000820154815260200160018201548152505061026d565b8282815181106104dd57634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806104f390610788565b91505061045d565b50919050565b604080516101008101909152600060c0820181815260e083019190915281526020810161052c61056c565b8152602001600081526020016000600b81111561055957634e487b7160e01b600052602160045260246000fd5b8152602001600081526020016000905290565b60405180604001604052806002906020820280368337509192915050565b60006040828403121561059b578081fd5b6040516040810181811067ffffffffffffffff821117156105ca57634e487b7160e01b83526041600452602483fd5b604052823581526020928301359281019290925250919050565b6000602082840312156105f5578081fd5b5035919050565b6000806040838503121561060e578081fd5b50508035926020909101359150565b6005811061062d5761062d6107af565b9052565b6003811061062d5761062d6107af565b600c811061062d5761062d6107af565b61066682825180518252602090810151910152565b6020808201516040840160005b600281101561069057825182529183019190830190600101610673565b505050506040810151608083015260608101516106b060a0840182610641565b5060808101516106c360c0840182610631565b5060a08101516106d660e084018261061d565b505050565b6020808252825182820181905260009190848201906040850190845b8181101561071e5761070a838551610651565b9284019261010092909201916001016106f7565b50909695505050505050565b855181526020808701519082015260c0810185604083015261074f6060830186610641565b61075c6080830185610631565b61076960a083018461061d565b9695505050505050565b61010081016107828284610651565b92915050565b60006000198214156107a857634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052602160045260246000fdfea264697066735822122048f15bd43176ab2cdb775aa104ffe107b71706d9983d24f79032d6468606f52764736f6c63430008040033";
