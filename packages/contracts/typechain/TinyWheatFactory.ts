/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { TinyWheat } from "./TinyWheat";

export class TinyWheatFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _farmland: string,
    _connnectedWorld: string,
    overrides?: Overrides
  ): Promise<TinyWheat> {
    return super.deploy(
      _farmland,
      _connnectedWorld,
      overrides || {}
    ) as Promise<TinyWheat>;
  }
  getDeployTransaction(
    _farmland: string,
    _connnectedWorld: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _farmland,
      _connnectedWorld,
      overrides || {}
    );
  }
  attach(address: string): TinyWheat {
    return super.attach(address) as TinyWheat;
  }
  connect(signer: Signer): TinyWheatFactory {
    return super.connect(signer) as TinyWheatFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TinyWheat {
    return new Contract(address, _abi, signerOrProvider) as TinyWheat;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmland",
        type: "address",
      },
      {
        internalType: "contract TinyWorld",
        name: "_connnectedWorld",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "farmer",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200134b3803806200134b833981016040819052620000349162000185565b60405180604001604052806009815260200168151a5b9e55da19585d60ba1b815250604051806040016040528060038152602001620a8ae960eb1b81525082828281600390805190602001906200008d929190620000df565b508051620000a3906004906020840190620000df565b5050600580546001600160a01b039384166001600160a01b03199182161790915560068054979093169616959095179055506200021992505050565b828054620000ed90620001c3565b90600052602060002090601f0160209004810192826200011157600085556200015c565b82601f106200012c57805160ff19168380011785556200015c565b828001600101855582156200015c579182015b828111156200015c5782518255916020019190600101906200013f565b506200016a9291506200016e565b5090565b5b808211156200016a57600081556001016200016f565b6000806040838503121562000198578182fd5b8251620001a58162000200565b6020840151909250620001b88162000200565b809150509250929050565b600181811c90821680620001d857607f821691505b60208210811415620001fa57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b03811681146200021657600080fd5b50565b61112280620002296000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80636a627842116100715780636a6278421461014157806370a082311461015657806395d89b411461017f578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b806306fdde03146100b9578063095ea7b3146100d757806318160ddd146100fa57806323b872dd1461010c578063313ce5671461011f578063395093511461012e575b600080fd5b6100c16101e6565b6040516100ce9190610fe4565b60405180910390f35b6100ea6100e5366004610f29565b610278565b60405190151581526020016100ce565b6002545b6040519081526020016100ce565b6100ea61011a366004610eee565b610290565b604051601281526020016100ce565b6100ea61013c366004610f29565b610599565b61015461014f366004610ea2565b6105d8565b005b6100fe610164366004610ea2565b6001600160a01b031660009081526020819052604090205490565b6100c1610647565b6100ea610195366004610f29565b610656565b6100ea6101a8366004610f29565b6106f3565b6100fe6101bb366004610ebc565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f5906110b1565b80601f0160208091040260200160405190810160405280929190818152602001828054610221906110b1565b801561026e5780601f106102435761010080835404028352916020019161026e565b820191906000526020600020905b81548152906001019060200180831161025157829003601f168201915b5050505050905090565b6000336102868185856109ef565b5060019392505050565b600554604051631a2986e560e31b81526001600160a01b038086166004830152600092869286929091169063d14c37289060240160206040518083038186803b1580156102dc57600080fd5b505afa1580156102f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103149190610f52565b6103395760405162461bcd60e51b815260040161033090611037565b60405180910390fd5b600554604051631a2986e560e31b81526001600160a01b0383811660048301529091169063d14c37289060240160206040518083038186803b15801561037e57600080fd5b505afa158015610392573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b69190610f52565b6103d25760405162461bcd60e51b815260040161033090611037565b60055460405163cb7869fd60e01b81526001600160a01b038481166004830152600192169063993c157990829063cb7869fd90602401604080518083038186803b15801561041f57600080fd5b505afa158015610433573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104579190610f72565b60055460405163cb7869fd60e01b81526001600160a01b0387811660048301529091169063cb7869fd90602401604080518083038186803b15801561049b57600080fd5b505afa1580156104af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d39190610f72565b6040518363ffffffff1660e01b81526004016104f0929190611067565b60206040518083038186803b15801561050857600080fd5b505afa15801561051c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105409190610fcc565b11156105845760405162461bcd60e51b8152602060048201526013602482015272283630bcb2b9399030b932903a37b7903330b960691b6044820152606401610330565b61058f868686610b13565b9695505050505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061028690829086906105d390879061108d565b6109ef565b6006546001600160a01b031633146106325760405162461bcd60e51b815260206004820152601d60248201527f43616c6c6572206973206e6f742061206661726d6c616e642074696c650000006044820152606401610330565b61064481670de0b6b3a7640000610b39565b50565b6060600480546101f5906110b1565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156106db5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610330565b6106e882868684036109ef565b506001949350505050565b600554604051631a2986e560e31b81523360048201819052600092909185916001600160a01b03169063d14c37289060240160206040518083038186803b15801561073d57600080fd5b505afa158015610751573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107759190610f52565b6107915760405162461bcd60e51b815260040161033090611037565b600554604051631a2986e560e31b81526001600160a01b0383811660048301529091169063d14c37289060240160206040518083038186803b1580156107d657600080fd5b505afa1580156107ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080e9190610f52565b61082a5760405162461bcd60e51b815260040161033090611037565b60055460405163cb7869fd60e01b81526001600160a01b038481166004830152600192169063993c157990829063cb7869fd90602401604080518083038186803b15801561087757600080fd5b505afa15801561088b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108af9190610f72565b60055460405163cb7869fd60e01b81526001600160a01b0387811660048301529091169063cb7869fd90602401604080518083038186803b1580156108f357600080fd5b505afa158015610907573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092b9190610f72565b6040518363ffffffff1660e01b8152600401610948929190611067565b60206040518083038186803b15801561096057600080fd5b505afa158015610974573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109989190610fcc565b11156109dc5760405162461bcd60e51b8152602060048201526013602482015272283630bcb2b9399030b932903a37b7903330b960691b6044820152606401610330565b6109e68585610c18565b95945050505050565b6001600160a01b038316610a515760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610330565b6001600160a01b038216610ab25760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610330565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600033610b21858285610c26565b610b2c858585610cb8565b60019150505b9392505050565b6001600160a01b038216610b8f5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610330565b8060026000828254610ba1919061108d565b90915550506001600160a01b03821660009081526020819052604081208054839290610bce90849061108d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600033610286818585610cb8565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610cb25781811015610ca55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610330565b610cb284848484036109ef565b50505050565b6001600160a01b038316610d1c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610330565b6001600160a01b038216610d7e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610330565b6001600160a01b03831660009081526020819052604090205481811015610df65760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610330565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610e2d90849061108d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e7991815260200190565b60405180910390a3610cb2565b80356001600160a01b0381168114610e9d57600080fd5b919050565b600060208284031215610eb3578081fd5b610b3282610e86565b60008060408385031215610ece578081fd5b610ed783610e86565b9150610ee560208401610e86565b90509250929050565b600080600060608486031215610f02578081fd5b610f0b84610e86565b9250610f1960208501610e86565b9150604084013590509250925092565b60008060408385031215610f3b578182fd5b610f4483610e86565b946020939093013593505050565b600060208284031215610f63578081fd5b81518015158114610b32578182fd5b600060408284031215610f83578081fd5b6040516040810181811067ffffffffffffffff82111715610fb257634e487b7160e01b83526041600452602483fd5b604052825181526020928301519281019290925250919050565b600060208284031215610fdd578081fd5b5051919050565b6000602080835283518082850152825b8181101561101057858101830151858201604001528201610ff4565b818111156110215783604083870101525b50601f01601f1916929092016040019392505050565b6020808252601690820152752737ba1030b71032bc33b930b9b4b090383630bcb2b960511b604082015260600190565b825181526020808401518183015282516040830152820151606082015260808101610b32565b600082198211156110ac57634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806110c557607f821691505b602082108114156110e657634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220433a2e0cd40dc7eeab63175a6d41c3d37aa7566087314d19ed160b4ba4e76b6164736f6c63430008040033";
