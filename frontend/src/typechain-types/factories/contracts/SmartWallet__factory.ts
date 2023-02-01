/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SmartWallet,
  SmartWalletInterface,
} from "../../contracts/SmartWallet";

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
    inputs: [
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "magicValue",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6106168061007e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80631626ba7e14610051578063715018a6146100825780638da5cb5b1461008c578063f2fde38b146100a7575b600080fd5b61006461005f3660046104df565b6100ba565b6040516001600160e01b031990911681526020015b60405180910390f35b61008a610116565b005b6000546040516001600160a01b039091168152602001610079565b61008a6100b536600461059a565b61012a565b6000806100c784846101a8565b9050806001600160a01b03166100e56000546001600160a01b031690565b6001600160a01b0316036101035750630b135d3f60e11b9050610110565b506001600160e01b031990505b92915050565b61011e6101cc565b6101286000610226565b565b6101326101cc565b6001600160a01b03811661019c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6101a581610226565b50565b60008060006101b78585610276565b915091506101c4816102bb565b509392505050565b6000546001600160a01b031633146101285760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610193565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008082516041036102ac5760208301516040840151606085015160001a6102a087828585610405565b945094505050506102b4565b506000905060025b9250929050565b60008160048111156102cf576102cf6105ca565b036102d75750565b60018160048111156102eb576102eb6105ca565b036103385760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610193565b600281600481111561034c5761034c6105ca565b036103995760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610193565b60038160048111156103ad576103ad6105ca565b036101a55760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610193565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561043c57506000905060036104c0565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610490573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166104b9576000600192509250506104c0565b9150600090505b94509492505050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156104f257600080fd5b82359150602083013567ffffffffffffffff8082111561051157600080fd5b818501915085601f83011261052557600080fd5b813581811115610537576105376104c9565b604051601f8201601f19908116603f0116810190838211818310171561055f5761055f6104c9565b8160405282815288602084870101111561057857600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000602082840312156105ac57600080fd5b81356001600160a01b03811681146105c357600080fd5b9392505050565b634e487b7160e01b600052602160045260246000fdfea26469706673582212206c7c7c677ac74e3ef1b4e55191ab073cdb0aa49fe5186a58f9715d44ead6675b64736f6c63430008110033";

type SmartWalletConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SmartWalletConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SmartWallet__factory extends ContractFactory {
  constructor(...args: SmartWalletConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SmartWallet> {
    return super.deploy(overrides || {}) as Promise<SmartWallet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SmartWallet {
    return super.attach(address) as SmartWallet;
  }
  override connect(signer: Signer): SmartWallet__factory {
    return super.connect(signer) as SmartWallet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SmartWalletInterface {
    return new utils.Interface(_abi) as SmartWalletInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SmartWallet {
    return new Contract(address, _abi, signerOrProvider) as SmartWallet;
  }
}
