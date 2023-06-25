const useBroadcast = (): any => {
  const broadcastMessage = async (
    client: any,
    broadcasts_array: any,
    message: any,
  ) => {
    //Initialize the xmtp client
    console.log("Broadcasting from: ", client.address, broadcasts_array);

    //Querying the activation status of the wallets
    const broadcasts_canMessage = await client.canMessage(broadcasts_array);
    for (let i = 0; i < broadcasts_array.length; i++) {
      //Checking the activation status of each wallet
      const wallet = broadcasts_array[i];
      const canMessage = broadcasts_canMessage[i];
      console.log(wallet, canMessage);
      if (broadcasts_canMessage[i]) {
        //If activated, start
        try {
          const conversation = await client.conversations.newConversation(
            wallet,
          );
          // Send a message
          const sent = await conversation.send(message);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return broadcastMessage;
};

export default useBroadcast;
