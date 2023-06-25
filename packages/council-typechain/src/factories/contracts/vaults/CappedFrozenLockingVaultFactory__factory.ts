/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CappedFrozenLockingVaultFactory,
  CappedFrozenLockingVaultFactoryInterface,
} from "../../../contracts/vaults/CappedFrozenLockingVaultFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "staleBlockLag",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lockBalance",
        type: "uint256",
      },
    ],
    name: "CappedFrozenLockingVaultCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_staleBlockLag",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lockBalance",
        type: "uint256",
      },
    ],
    name: "createCappedFrozenLockingVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506119c1806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063dd00bfb714610030575b600080fd5b61004361003e36600461013c565b61006c565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60008084848460405161007e9061012f565b73ffffffffffffffffffffffffffffffffffffffff909316835260208301919091526040820152606001604051809103906000f0801580156100c4573d6000803e3d6000fd5b506040805173ffffffffffffffffffffffffffffffffffffffff808416825288166020820152908101869052606081018590529091507f9359ad59292f612c53b4b5a8ce3a5d70d968258673bbd6bd3ea1d1fd73d846f69060800160405180910390a1949350505050565b6118038061018983390190565b600080600060608486031215610150578283fd5b833573ffffffffffffffffffffffffffffffffffffffff81168114610173578384fd5b9560208501359550604090940135939250505056fe60e060405234801561001057600080fd5b5060405161180338038061180383398101604081905261002f9161004d565b60609290921b6001600160601b03191660805260a05260c05261008e565b600080600060608486031215610061578283fd5b83516001600160a01b0381168114610077578384fd5b602085015160409095015190969495509392505050565b60805160601c60a05160c0516117126100f16000396000818161018d015281816102660152818161041c01526108bc01526000818161015801526108820152600081816101ed015281816103990152818161061501526109ff01526117126000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c8063e7d2028311610081578063fc0c546a1161005b578063fc0c546a146101e8578063fc7e286d1461020f578063ff50abdc1461025b576100d4565b8063e7d20283146101af578063e91f3235146101c2578063f45346dc146101d5576100d4565b80639f973fd5116100b25780639f973fd514610140578063c2c94b8814610153578063e228ecb414610188576100d4565b80631a3d3d96146100d95780632e1a7d4d146100e35780635d1c9e74146100f6575b600080fd5b6100e1610264565b005b6100e16100f13660046114d3565b61041a565b6001546101169073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100e161014e3660046113ac565b6106ae565b61017a7f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610137565b61017a7f000000000000000000000000000000000000000000000000000000000000000081565b61017a6101bd3660046113cd565b610849565b61017a6101d0366004611431565b61086b565b6100e16101e33660046113f6565b6108ba565b6101167f000000000000000000000000000000000000000000000000000000000000000081565b61022261021d3660046113ac565b610c92565b6040805173ffffffffffffffffffffffffffffffffffffffff90931683526bffffffffffffffffffffffff909116602083015201610137565b61017a60005481565b7f0000000000000000000000000000000000000000000000000000000000000000600054116102f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f6e6f742066756c6c00000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60015460005460405190815273ffffffffffffffffffffffffffffffffffffffff909116907fd4654673bf857a33b1dc04d8e996c9fb579b067751dab1b4346711e95c4c503b9060200160405180910390a26001546000546040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015260248101919091527f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb90604401602060405180830381600087803b1580156103df57600080fd5b505af11580156103f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041791906114b3565b50565b7f0000000000000000000000000000000000000000000000000000000000000000600054106104a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f46726f7a656e000000000000000000000000000000000000000000000000000060448201526064016102eb565b60006104af610cf9565b336000908152602091909152604090208054909150829082906014906104fc9084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff16611680565b82546bffffffffffffffffffffffff9182166101009390930a928302919092021990911617905550805473ffffffffffffffffffffffffffffffffffffffff166000610546610d3e565b905060006105548284610d91565b905061056c836105648784611669565b849190610e32565b73ffffffffffffffffffffffffffffffffffffffff8316337f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e06105cf887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6115b1565b60405190815260200160405180910390a36040517fa9059cbb000000000000000000000000000000000000000000000000000000008152336004820152602481018690527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063a9059cbb90604401602060405180830381600087803b15801561066e57600080fd5b505af1158015610682573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a691906114b3565b505050505050565b60006106b8610cf9565b33600090815260209190915260408120805473ffffffffffffffffffffffffffffffffffffffff8581167fffffffffffffffffffffffff000000000000000000000000000000000000000083161783559193506bffffffffffffffffffffffff740100000000000000000000000000000000000000008204169291169061073d610d3e565b9050600061074b8284610d91565b905061075b836105648684611669565b73ffffffffffffffffffffffffffffffffffffffff8316337f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e06107be877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6115b1565b60405190815260200160405180910390a360006107db8388610d91565b90506107f3876107eb8784611530565b859190610e32565b60405185815273ffffffffffffffffffffffffffffffffffffffff88169033907f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e09060200160405180910390a350505050505050565b600080610854610d3e565b9050610861818585610f71565b9150505b92915050565b600080610876610d3e565b90506108b086866108a77f000000000000000000000000000000000000000000000000000000000000000043611669565b84929190610fe0565b9695505050505050565b7f000000000000000000000000000000000000000000000000000000000000000060005410610947576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102eb9060208082526004908201527f46756c6c00000000000000000000000000000000000000000000000000000000604082015260600190565b73ffffffffffffffffffffffffffffffffffffffff81166109c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5a65726f20616464722064656c65676174696f6e00000000000000000000000060448201526064016102eb565b6040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018390527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906323b872dd90606401602060405180830381600087803b158015610a5857600080fd5b505af1158015610a6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9091906114b3565b506000610a9b610cf9565b73ffffffffffffffffffffffffffffffffffffffff8086166000908152602092909252604090912080549092501680610b7b575080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff831617808255829084908390601490610b489084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff16611548565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff160217905550610be4565b815484908390601490610bb59084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff16611548565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff1602179055505b6000610bee610d3e565b90506000610bfc8284610d91565b90508273ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e088604051610c5d91815260200190565b60405180910390a3610c73836105648884611530565b85600080828254610c849190611530565b909155505050505050505050565b6000806000610c9f610cf9565b73ffffffffffffffffffffffffffffffffffffffff9485166000908152602091909152604090205493841694740100000000000000000000000000000000000000009094046bffffffffffffffffffffffff169392505050565b6000610d396040518060400160405280600881526020017f6465706f73697473000000000000000000000000000000000000000000000000815250611064565b905090565b604080518082019091526060815260006020820152610d396040518060400160405280600b81526020017f766f74696e67506f7765720000000000000000000000000000000000000000008152506110dd565b600080610d9f846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020919091526040902080549091506fffffffffffffffffffffffffffffffff1680610dec57600092505050610865565b6000610e2783610dfd600185611669565b016001015460c081901c9177ffffffffffffffffffffffffffffffffffffffffffffffff90911690565b979650505050505050565b77ffffffffffffffffffffffffffffffffffffffffffffffff811115610eb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f4f6f42000000000000000000000000000000000000000000000000000000000060448201526064016102eb565b6000610ec1846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020829052604081208054929350914360c01b9185831791608081901c916fffffffffffffffffffffffffffffffff909116908115610f2957610f2586610dfd600185611669565b5090505b8143821415610f4057610f3d600184611669565b90505b8481600189010155438214610f6457610f648785610f5f866001611530565b61111b565b5050505050505050505050565b600080610f7f856020015190565b73ffffffffffffffffffffffffffffffffffffffff85166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff90911690610fd28488838686611144565b9a9950505050505050505050565b600080610fee866020015190565b73ffffffffffffffffffffffffffffffffffffffff86166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff9091169080611042858a8a8787611144565b9150915083821115610fd25761105984838761131d565b610fd285838561111b565b6000807f03a912cdb153207069d92d44a2357e3f0ce00f7ee84da3510f1c6851b4cac4ee90506000818460405160200161109f9291906114eb565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190528051602090910120949350505050565b60408051808201909152606081526000602082015260006110fd8361134d565b6040805180820190915284815260208101919091529150505b919050565b80821061112757600080fd5b6fffffffffffffffffffffffffffffffff1660809190911b179055565b600080826111ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f756e696e697469616c697a65640000000000000000000000000000000000000060448201526064016102eb565b858511156111bb57600080fd5b8284106111c757600080fd5b60006111d4600185611669565b90508460005b82821461127857600060026111ef8585611530565b6111fa906001611530565b6112049190611578565b6001818d01015490915060c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168b821415611246579296509194506113139350505050565b8b821015611262578a82101561125a578293505b829450611270565b61126d600184611669565b95505b5050506111da565b60018a8301015460c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168a821115611309576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f536561726368204661696c75726500000000000000000000000000000000000060448201526064016102eb565b9195509093505050505b9550959350505050565b8183111561132a57600080fd5b60018101835b8381101561134657600082820155600101611330565b5050505050565b6000807f7b1a68ec3e3284b167e69db1c622dcfa612281976b71d7e2d239dbe16a75891a90506000818460405160200161109f9291906114eb565b803573ffffffffffffffffffffffffffffffffffffffff8116811461111657600080fd5b6000602082840312156113bd578081fd5b6113c682611388565b9392505050565b600080604083850312156113df578081fd5b6113e883611388565b946020939093013593505050565b60008060006060848603121561140a578081fd5b61141384611388565b92506020840135915061142860408501611388565b90509250925092565b60008060008060608587031215611446578081fd5b61144f85611388565b935060208501359250604085013567ffffffffffffffff80821115611472578283fd5b818701915087601f830112611485578283fd5b813581811115611493578384fd5b8860208285010111156114a4578384fd5b95989497505060200194505050565b6000602082840312156114c4578081fd5b815180151581146113c6578182fd5b6000602082840312156114e4578081fd5b5035919050565b60008382528251815b81811015611510576020818601810151858301820152016114f4565b818111156115215782602083860101525b50919091016020019392505050565b60008219821115611543576115436116ad565b500190565b60006bffffffffffffffffffffffff80831681851680830382111561156f5761156f6116ad565b01949350505050565b6000826115ac577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff818413828413858304851182821616156115f0576115f06116ad565b7f80000000000000000000000000000000000000000000000000000000000000008487128682058812818416161561162a5761162a6116ad565b858712925087820587128484161615611645576116456116ad565b8785058712818416161561165b5761165b6116ad565b505050929093029392505050565b60008282101561167b5761167b6116ad565b500390565b60006bffffffffffffffffffffffff838116908316818110156116a5576116a56116ad565b039392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220680264e6934e29cd78968fffad975024b7b2df6d27710ad9a495beffcaa624e164736f6c63430008030033a2646970667358221220dbcfd04d5bbea5c3a67ea654c8a1c106557e5bf23cafc63634c1346a101ee3f364736f6c63430008030033";

type CappedFrozenLockingVaultFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CappedFrozenLockingVaultFactoryConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CappedFrozenLockingVaultFactory__factory extends ContractFactory {
  constructor(...args: CappedFrozenLockingVaultFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<CappedFrozenLockingVaultFactory> {
    return super.deploy(
      overrides || {},
    ) as Promise<CappedFrozenLockingVaultFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CappedFrozenLockingVaultFactory {
    return super.attach(address) as CappedFrozenLockingVaultFactory;
  }
  override connect(signer: Signer): CappedFrozenLockingVaultFactory__factory {
    return super.connect(signer) as CappedFrozenLockingVaultFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CappedFrozenLockingVaultFactoryInterface {
    return new utils.Interface(
      _abi,
    ) as CappedFrozenLockingVaultFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CappedFrozenLockingVaultFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider,
    ) as CappedFrozenLockingVaultFactory;
  }
}
