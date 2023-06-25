Powerful AI models should be a public good, just like Linux, Ethereum, and academic research on AI

  
A crypto community should be able to download and self-host an AI model to run a support or educational chatbot or audit a contract without being constrained by licenses, biased fine-tuning, and data sharing.


Our new type of DAO allows us to crowdsource and manage the multi-stage process of creating large AI models. We showcase the value of crowdfunded AI with its ability to find bugs in solidity contracts. The communication with the AI model and between the members is privacy-preserving and anonymous -- no IP or DNS. 


The DAO has a governance vault for voting and multiple funding vaults to raise capital. The proposals in the governance vault create funding vaults. Funding vaults can be used for gathering data, cleaning the data, pre-training, fine-tuning, RLHF, and even hosting. Donors contribute to the funding vault, for example, for GPU compute to pre-train an LLM and, in return, get votes for the governance vault. Users can use the UI to delegate, vote, act on proposals, chat, and use the trained AI. The fund vault allows deposits and withdraws until the total amount reaches a threshold; after, the fund is locked, and the funds will be sent to an address to execute on the proposal, such as pre-training of LLM. We inherit from delv-council's vault contracts with additional functionality.


Voters can communicate with each other just by knowing each other's wallet addresses making the decision process privacy-preserving, unbiased, and resilient to corruption and coalitions. We make a group chat from a p2p chat (XMTP) by sending the message to all recipients.


For our showcase, we trained the AI on existing vulnerabilities presented by Quantstamp and Slither's vulnerability list. The training uses HuggingFace's sentence_transformer to generate 384-dimensional vector embedding. The AI audit of the solidity code looks for similarities to known vulnerability patterns and returns the top 3 matches.


<img width="667" alt="Screenshot 2023-06-25 105057" src="https://github.com/ethWaterloo23-fundAiTrainingDao/fundAiTrainingDao/assets/1944021/b9b50712-ad61-4a8a-a068-4bceed913c99">
