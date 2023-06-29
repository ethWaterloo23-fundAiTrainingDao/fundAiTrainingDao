
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

Delv's council provides `FrozenLockingVolt.sol` that locks the cpaital and
reverts withdraws. We inheret from 'FrozenLockingVolt.sol' into two contracts:
`CappedFrozenLockingVault.sol` responsible for raising funds for different
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

### [ `CappedFrozenLockingVolt.sol` ]( packages/council-typechain/contracts/vaults/CappedFrozenLockingVault.sol ) (our addition)

- inherets from `FrozenLockingVolt.sol` (TODO: should inheret from `LockingVolt.sol` since it overwrites withdraw anyway)
- initiated by executing `FrozenLockingVaultFactory.sol`'s proposal
- turns off deposits and withdraws when the fund is full
- keeps track of votes to be used in `FrozenLockingVaultFactory.sol`
- has a function of sending all of the funds after the fund is full to a grant reciever specified in the initializing proposal in `FrozenLockingVaultFactory.sol`

### [ `FrozenLockingVaultFactory.sol` ]( packages/council-typechain/contracts/vaults/FrozenLockingVaultFactory.sol ) (our addition)

- inherets from `LockingVolt.sol`
- adds a function to create `CappedFrozenLockingVault.sol` with size of the vault and the reciepient as arguments
- responsible for hangling the proposals and voting

# Communication between members

Annonymous communication between members reduces chances of corruption, bribery, and destructive cortel.

We chose XMTP protocol for the communications between members. It essentially
is Signal messanger's encryption with web3 addresses instead of phone numbers.

We extend XMTP protocol with group messages and create a web UI inside the DAO UI to allow members to communicate.

# AI to audit contracts

# Local deployment





