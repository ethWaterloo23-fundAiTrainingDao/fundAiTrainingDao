import { CouncilConfig } from "src/config/CouncilConfig";

export const localhostCouncilConfig: CouncilConfig = {
  version: "",
  chainId: 31337,
  timelock: {
    address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  },
  coreVoting: {
    name: "Core Voting",
    address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    descriptionURL: "https://moreinfo.com",
    vaults: [
      {
        name: "Data gathering",
        address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
        type: "LockingVault",
        descriptionURL: "https://moreinfo.com",
      },
      {
        name: "Vector Embedings",
        address: "0xc6ba8c3233ecf65b761049ef63466945c362edd2",
        type: "FundVault",
        descriptionURL: "https://moreinfo.com",
      },
    ],
    proposals: {
      0: {
        descriptionURL: "https://moreinfo.com",
        title: "EGP-2: Increase GSC quorum threshold",
        targets: [],
        calldatas: [],
        sentenceSummary: "Increase the current GSC quroum threshold to 3.",
        paragraphSummary:
          "As of today (April 28, 2022) there has only been one delegate (myself) who has proven their membership to the GSC on-chain. In roughly five days I will be able to pass votes by myself with no further approval because the current quroum threshold on the GSC is one. I believe that no one person should be able to govern the GSC by themselves, and thus I am proposing to effectively lock the GSC until two other delegates join the GSC. Three was chosen as a starting point for one reason, to break a tie. As more delegates join, I'm sure this value will gradually increase but for the time being, a threshold of three will be adequate to ensure some level of participation.",
      },
    },
  },

  // gscVoting: {
  //   name: "GSC",
  //   address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   descriptionURL: "https://moreinfo.com",
  //   vaults: [
  //     {
  //       name: "GSC Vault",
  //       address: "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
  //       type: "GSCVault",
  //       descriptionURL: "https://moreinfo.com",
  //     },
  //   ],
  //   proposals: {},
  // },
};
