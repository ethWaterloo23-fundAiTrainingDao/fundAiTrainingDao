import {
  arbitrum,
  gnosisChiado,
  goerli,
  hardhat,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
} from "viem/chains";

const xdcMainnet: any = {
  id: 50,
  name: "XDC Mainnet",
  network: "xdcmainnet",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC",
  },
  rpcUrls: {
    default: "https://erpc.xinfin.network",
    public: "https://erpc.xinfin.network",
  },
  blockExplorers: {
    default: {
      name: "XDC Apothem Explorer",
      url: "https://explorer.xinfin.network/",
    },
  },
  testnet: false,
};

const xdcApothem: any = {
  id: 51,
  name: "XDC Apothem Network",
  network: "apothem",
  nativeCurrency: {
    decimals: 18,
    name: "Test XDC",
    symbol: "tXDC",
  },
  rpcUrls: {
    default: "https://erpc.apothem.network",
    public: "https://erpc.apothem.network",
  },
  blockExplorers: {
    default: {
      name: "XDC Apothem Explorer",
      url: "https://explorer.apothem.network/",
    },
  },
  testnet: true,
};

const polygonMumbaiCustom: any = {
  id: 80001,
  name: "Mumbai",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.matic.today",
    public: "https://rpc-mumbai.matic.today",
  },
  blockExplorers: {
    default: {
      name: "Polygon PoS Chain Testnet Explorer",
      url: "https://mumbai.polygonscan.com/",
    },
  },
  testnet: true,
};

export const supportedChains = {
  localhost: hardhat,
  mainnet,
  goerli,
  sepolia,
  optimism,
  arbitrum,
  polygon,
  polygonMumbai,
  polygonMumbaiCustom,
  gnosisChiado,
  xdcMainnet,
  xdcApothem,
};

export type SupportedChain = keyof typeof supportedChains;

export const supportedChainNames = Object.keys(
  supportedChains,
) as SupportedChain[];
