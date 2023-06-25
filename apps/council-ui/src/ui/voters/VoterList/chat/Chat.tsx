/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-restricted-imports */
import { useAddress } from "@thirdweb-dev/react";
import * as React from "react";
import { useState } from "react";
import useBroadcast from "../../hooks/useBroadcast";
import styles from "./Chat.module.css";

function Chat({
  client,
  messageHistory,
  conversation,
  addresses,
}): JSX.Element {
  const address = useAddress();
  const broadcastMessage = useBroadcast();
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // useEffect(() => {
  //   console.log(broadCastAddresses)
  // }, [broadCastAddresses]);
  // Function to handle sending a text message
  const onSendMessage = async (value: any) => {
    // return conversation.send(value);
    console.log({ addresses });
    await broadcastMessage(client, addresses, value);
  };

  // MessageList component to render the list of messages
  const MessageList = ({ messages }): JSX.Element => {
    // Filter messages by unique id
    messages = messages.filter(
      (v: { id: any }, i: any, a: any[]) =>
        a.findIndex((t: { id: any }) => t.id === v.id) === i,
    );

    return (
      <ul className="messageList">
        {messages.map(
          (
            message: {
              id: React.Key | null | undefined;
              senderAddress:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | null
                | undefined;
              content:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              sent: {
                toLocaleTimeString: () =>
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              };
            },
            index: any,
          ) => (
            <li
              key={message.id}
              className="messageItem"
              title="Click to log this message to the console"
            >
              <strong>
                {message.senderAddress === address
                  ? "You"
                  : message.senderAddress}
                :
              </strong>
              <span>{message.content}</span>
              <span className="date">
                {" "}
                ({message.sent.toLocaleTimeString()})
              </span>
              <span className="eyes" onClick={() => console.log(message)}>
                👀
              </span>
            </li>
          ),
        )}
      </ul>
    );
  };

  // Function to handle input change (keypress or change event)
  const handleInputChange = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    } else {
      setInputValue(event.target.value);
    }
  };
  return (
    <div className={styles.Chat}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputField}
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
        />
        <button className={styles.sendButton} onClick={handleSend}>
          &#128073;
        </button>
      </div>
      <div className={styles.messageContainer}>
        <MessageList messages={messageHistory} />
      </div>
    </div>
  );
}

export default Chat;
