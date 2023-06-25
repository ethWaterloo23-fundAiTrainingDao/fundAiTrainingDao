import {
  arbitrum,
  gnosisChiado,
  goerli,
  hardhat,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "viem/chains";

export const supportedChains = {
  localhost: hardhat,
  mainnet,
  goerli,
  sepolia,
  optimism,
  arbitrum,
  polygon,
  gnosisChiado,
};

export type SupportedChain = keyof typeof supportedChains;

export const supportedChainNames = Object.keys(
  supportedChains,
) as SupportedChain[];
