/* eslint-disable no-console */
import { Client } from "@xmtp/xmtp-js";
import { Signer } from "ethers";
import { ReactElement } from "react";

const AI_BACKEND = "0x46fC2771f9Ad87b57EFD8b1157DeFd3bEd69d324";

export async function queryVectorBackend(
  account: Signer,
  message: string,
): Promise<string | null> {
  // Initialize the xmtp client
  const client = await Client.create(account);
  // Initialize the xmtp client
  // console.log("Broadcasting from: ", client.address);

  // Querying the activation status of the wallet
  const canMessage = await client.canMessage(AI_BACKEND);

  // Checking the activation status of the wallet
  // console.log(AI_BACKEND, canMessage);

  if (canMessage) {
    // If activated, start
    const conversation = await client.conversations.newConversation(AI_BACKEND);

    // Send a message
    const response = await conversation.send(message);
    if (response.content != message) {
      // something wrong
      console.log("Something wrong");
      return null;
    }
    // Stream messages, break when the one message is received
    for await (const message of await conversation.streamMessages()) {
      // console.log(`[${message.senderAddress}]: ${message.content}`);
      return message.content;
    }
  }
  return null;
}

export default function Foobar(): ReactElement {
  return <></>;
}
