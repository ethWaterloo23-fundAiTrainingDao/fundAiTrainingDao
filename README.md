
<img width="667" alt="Screenshot 2023-06-25 105057" src="https://github.com/ethWaterloo23-fundAiTrainingDao/fundAiTrainingDao/assets/1944021/b9b50712-ad61-4a8a-a068-4bceed913c99">


Powerful AI models should be a public good, just like Linux, Ethereum, and
academic research on AI

  
A crypto community should be able to download and self-host an AI model to run
a support or educational chatbot or audit a contract without being constrained
by licenses, biased fine-tuning, and data sharing.


Our new type of DAO allows for transparency and cost reduction in crowdsourcing
and managing the multi-stage process of creating large AI models. We showcase
the value of crowdfunded AI with its ability to find bugs in solidity
contracts. The communication with the AI model and between the members is
privacy-preserving and anonymous -- no IP or DNS. 


The DAO has a governance vault for voting and multiple funding vaults to raise
capital. The proposals in the governance vault create funding vaults. Funding
vaults can be used for gathering data, cleaning the data, pre-training,
fine-tuning, RLHF, and even hosting. Donors contribute to the funding vault,
for example, for GPU compute to pre-train an LLM and, in return, get votes for
the governance vault. Users can use the UI to delegate, vote, act on proposals,
chat, and use the trained AI. The fund vault allows deposits and withdraws
until the total amount reaches a threshold; after, the fund is locked, and the
funds will be sent to an address to execute the proposal, such as
pre-training of LLM. We inherit from delv-council's vault contracts with
additional functionality.


Voters can communicate with each other just by knowing each other's wallet
addresses making the decision process privacy-preserving, unbiased, and
resilient to corruption and coalitions. We make a group chat from a p2p chat
(XMTP) by sending the message to all recipients.


For our showcase, we trained the AI on existing vulnerabilities presented by
Quantstamp and Slither's vulnerability list. The training uses HuggingFace's
sentence_transformer to generate 384-dimensional vector embedding. The AI audit
of the solidity code looks for similarities to known vulnerability patterns and
returns the top 3 matches.


# DAO implementation

![image](https://github.com/ethWaterloo23-fundAiTrainingDao/fundAiTrainingDao/assets/1944021/5065b48d-4375-4a22-8ed0-77c96342eafc)

The main idea is to split a typical DAO's vault functionality into different
contracts: *crowdfunder* responsible for crowdfunding the money needed for an
action, and *reviewer* that reviews the proposals to create crowdfunds and
manages voting to lunch the crowdfunds.

Delv's council provides `FrozenLockingVolt.sol` that locks the cpaital and
reverts withdraws. We inheret from 'FrozenLockingVolt.sol' into the two mentionned contracts:
crowdfund `CappedFrozenLockingVault.sol` responsible for raising funds for different
steps and tasks related to training large AI models and
`FrozenLockingVaultFactory.sol` responsible for governance of starting
`CappedFrozenLockingVault.sol` vaults.  

### Council's [ `LockingVolt.sol` ]( packages/council-typechain/contracts/vaults/LockingVault.sol )

manges:
- deposits
- votes
- delegations

### Council's [ `FrozenLockingVolt.sol` ]( packages/council-typechain/contracts/vaults/FrozenLockingVault.sol )

- inherets from `LockingVolt.sol` 

Frozen because it removes a withdraw functionality

### crowdfunder contract [ `CappedFrozenLockingVolt.sol` ]( packages/council-typechain/contracts/vaults/CappedFrozenLockingVault.sol ) (our addition)

- inherets from `FrozenLockingVolt.sol` (TODO: should inheret from `LockingVolt.sol` since it overwrites withdraw anyway)
- initiated by executing `FrozenLockingVaultFactory.sol`'s proposal
- turns off deposits and withdraws when the fund is full
- keeps track of votes to be used in `FrozenLockingVaultFactory.sol`
- has a function of sending all of the funds after the fund is full to a grant reciever specified in the initializing proposal in `FrozenLockingVaultFactory.sol`

### reviewer contract [ `FrozenLockingVaultFactory.sol` ]( packages/council-typechain/contracts/vaults/FrozenLockingVaultFactory.sol ) (our addition)

- inherets from `LockingVolt.sol`
- adds a function to create `CappedFrozenLockingVault.sol` with size of the vault and the reciepient as arguments
- responsible for hangling the proposals and voting

### UI and build process related modification to Council

we modified the following config files:
- [apps/council-sdk-starter/package.json](apps/council-sdk-starter/package.json#L25)
  added a an option to a script to create a crowdfunder (crowdfunding vault)
- [apps/council-sdk-starter/src/scripts/createFund.ts](apps/council-sdk-starter/src/scripts/createFund.ts)
  a script to create a crowdfunder on chain and print the tx
- [apps/council-sdk-starter/src/scripts/changeVaultStatus.ts](apps/council-sdk-starter/src/scripts/changeVaultStatus.ts#L17)
  specify the address of the voting contract, which is a part of the reviewer
  entity
- lunched the local server on port 8888 due to some conflicts
- [apps/council-ui/.env.sample](apps/council-ui/.env.sample) added local rpc
  with port 8888 to the ui
- landing page chages
  [apps/council-ui/pages/index.tsx](apps/council-ui/pages/index.tsx)
- [apps/council-ui/src/config/council.config.ts](apps/council-ui/src/config/council.config.ts)
  specifuing which chain ui should use
- [apps/council-ui/src/config/localhost.ts](apps/council-ui/src/config/localhost.ts)
  UI to specify which crowdfunding vaults we created
- [apps/council-ui/src/ui/vaults/fundVault/FundVaultStatsRow.tsx](apps/council-ui/src/ui/vaults/fundVault/FundVaultStatsRow.tsx#L92)
  a UI widget that adds send all funds button to the Vault
- [apps/council-ui/src/ui/vaults/fundVault/hooks/useSendFunds.tsx](apps/council-ui/src/ui/vaults/fundVault/hooks/useSendFunds.tsx#L17)
  connects the send button to the chain

### adding XDC and Gnosis chains

we modified
[packages/council-cli/src/utils/chains.ts](packages/council-cli/src/utils/chains.ts)
file by adding the chain's information

# Communication between members

Annonymous communication between members reduces chances of corruption, bribery, and destructive cortel.

We chose XMTP protocol for the communications between members. It essentially
is Signal messanger's encryption with web3 addresses instead of phone numbers.

We extend XMTP protocol with group messages and create a web UI inside the DAO UI to allow members to communicate.

# AI to audit contracts

for lunching AI to audit contracts, see [packages/contract-analysis/README.md](packages/contract-analysis/README.md)

# Council-Kit (starting point to which we've made the modifications)

Council kit is the complete toolkit for scaffolding your own DAO using the
council protocol. This repository is designed to be forkable for your own
council protocol variant.

Get started with the [Docs](https://github.com/delvtech/council-kit/wiki).

Requires `Node 14+`.

## What's inside?

This monorepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps
| Name                                                                                                | Description                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [council-ui](https://github.com/delvtech/council-kit/tree/main/apps/council-ui)                   | A reference user interface built with NextJS and using the SDK. |
| [council-sdk-starter](https://github.com/delvtech/council-kit/tree/main/apps/council-sdk-starter) | A boilerplate TypeScript project that uses the SDK.             |

### Packages

| Name                                                                                                | Description                                                                 |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [council-sdk](https://github.com/delvtech/council-kit/tree/main/packages/council-sdk)             | A TypeScript SDK for interfacing with the Council protocol.                 |
| [council-deploy](https://github.com/delvtech/council-kit/tree/main/packages/council-deploy)       | A template for deploying council contracts on Goerli.                |
| [council-typechain](https://github.com/delvtech/council-kit/tree/main/packages/council-typechain) | Type classes generated from the council protocol contracts using Typechain. |

### Utility Packages

| Name                                                                                            | Description                          |
| ----------------------------------------------------------------------------------------------- | ------------------------------------ |
| [eslint-config](https://github.com/delvtech/council-kit/tree/main/packages/eslint-config)     | Package for static type checking.    |
| [prettier-config](https://github.com/delvtech/council-kit/tree/main/packages/prettier-config) | Package for code formatting.         |
| [tsconfig](https://github.com/delvtech/council-kit/tree/main/packages/tsconfig)               | Package for TypeScript configuation. |

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Monorepo commands

### Build

To build all apps and packages, run the following command:

```bash
yarn build

# build only packages (useful for app development)
yarn build:packages

```

### Develop

To run the development server for all apps, run the following command:

```bash
yarn dev
```

### Linting

To run linting on all apps and packages, run the following command:

```bash
yarn lint
```

### Formatting

To run formatting on all apps and packages, run the following command:

```bash
yarn format:check

# write formatting changes to files
yarn format

```

## Development

1. Clone the repo: `git clone git@github.com:delvtech/council-kit.git`
2. Run `yarn` at the top-level to install all packages across every workspace

### Installing new packages

Here are a few examples of how to install packages in this repo:

```bash
# Install prettier for the top-level package.json, useful for tooling that
# runs against the entire monorepo
yarn add prettier

# Install lodash for the packages/council-sdk workspace.
# Note: specify the workspace by the name in its `package.json`, ie: `@council/sdk` not `council-sdk`
yarn workspace @council/sdk add lodash
```

### Installing a workspace package

To install a project from the packages/ directory as a dependency, copy it
directly into your app package.json like this, then run `yarn`.

```json
{
  "dependencies": {
    "@council/sdk": "*",
    "@council/typechain": "*"
  }
}
```

### Running workspace scripts

To run scripts in workspaces, use the following command:

```bash
yarn workspace <workspace-name> <package.json script>
```

Example

```bash
yarn workspace council-ui start
```

## Turborepo

This package uses the [turborepo](https://turbo.build/) monorepo framework. Turborepo provides additional features compared to a plain monorepo such as local/remote command caching and parallel npm script execution.

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

### Resources

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

## Instructions on starting the AI portion

1. Launch the webpage `yarn workspace @council/cli council server -p 8888` and `yarn workspace council-ui dev` so that http://0.0.0.0:3100 is ready!

If the server errors saying `@council/sdk` can't be found, i.e.

```
Server Error
Error: Module not found: Can't resolve '@council/sdk'
> 1 | import {
  2 |   CouncilContext,
  3 |   GSCVault,
  4 |   GSCVotingContract,

Import trace for requested module:
./src/ui/council/CouncilProvider.tsx
./src/ui/app.tsx
./pages/_app.tsx
```

Try this:
```
cd packages/council-sdk
yarn install
yarn build
```
then repeat `yarn workspace council-ui dev` and works.

2. Start the XMTP relay, from `contract-analysis-gateway` directory, run `yarn start` to start the relay server, it should say `Listening on 0x46fC2771f9Ad87b57EFD8b1157DeFd3bEd69d324`. Note the environment variables in `.env` file should contain KEY and AI_BACKEND. E.g. `KEY=0xce2ad27f93873964525483d3aa5fb8c11e340048c02fdfb0bdce8c7925ca29ab` and `AI_BACKEND=https://api.fundhub.xyz` and make sure `XMTP_ENV=dev`.

3. Start the AI backend, from `contract-analysis` directory. Follow the [README.md](packages/contract-analysis/README.md), or [Dockerfile](packages/contract-analysis/Dockerfile). Check that `.env` has `ORG_TOKEN='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'`. Start by `uvicorn main:app --host 0.0.0.0 --port 3101`. Note that `curl https://api.fundhub.xyz` should work. Ubuntu may have outdated sqlite3, need to manually install the latest version.

```bash
wget https://www.sqlite.org/snapshot/sqlite-snapshot-202309111527.tar.gz;
tar -xf sqlite-snapshot-202309111527.tar.gz;
cd sqlite-snapshot-202309111527;
./configure;
make;
sudo make install;
sudo ldconfig;
sqlite3 --version
```

Also may need to manually pip install `pip install chromadb python-multipart`.

4. You're done! 🥳 You can visit http://localhost:3100/contracts and try to submit one of 3 example Solidity snippets. Wallet need to be connected.

5. For deployments, several steps.

* configure nginx reverse proxy for port 3100 and 3101.
* get a domain for the python backend, e.g. `api.fundhub.xyz`, and set up DNS records.
* configure .env for NEXT_PUBLIC_GOERLI_ALCHEMY_KEY or NEXT_PUBLIC_MAINNET_ALCHEMY_KEY
* configure `rpc.fundhub.xyz` if using local 8888 network.
* `yarn build` for `packages/council-sdk` and `packages/council-deploy` and lastly `apps/council-ui` (in that order).

