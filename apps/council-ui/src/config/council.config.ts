import { CouncilConfig } from "src/config/CouncilConfig";
import { localhostCouncilConfig } from "src/config/localhost";

// export type SupportedChainId = 1 | 5 | 100 | 31337;
// export type SupportedChainId = 100 | 31337;
export type SupportedChainId = 31337;

export const councilConfigs: Record<SupportedChainId, CouncilConfig> = {
  // 1: mainnetCouncilConfig,
  // 5: goerliCouncilConfig,
  // 100: gnosisCouncilConfig,
  31337: localhostCouncilConfig,
};
