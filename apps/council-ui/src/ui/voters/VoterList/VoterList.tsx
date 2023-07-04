import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Client } from "@xmtp/xmtp-js";
import { Signer } from "ethers";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { makeVoterURL } from "src/routes";
import { formatBalance } from "src/ui/base/formatting/formatBalance";
import {
  SortableGridTable,
  SortOptions,
} from "src/ui/base/tables/SortableGridTable";
import { useDelegatesByVault } from "src/ui/vaults/hooks/useDelegatesByVault";
import { VoterRowData } from "src/ui/voters/types";
import { VoterAddress } from "src/ui/voters/VoterAddress";
import { useSigner } from "wagmi";
// eslint-disable-next-line no-restricted-imports
import useBroadcast from "../hooks/useBroadcast";
import Chat from "./chat/Chat";

type SortField = "numberOfDelegators" | "votingPower";

interface VoterListProps {
  voters: VoterRowData[];
  size: number;
  onSizeChange: (newSize: number) => void;
}

export function VoterList({
  voters,
  size,
  onSizeChange,
}: VoterListProps): ReactElement {
  const [sortOptions, setSortOptions] = useState<SortOptions<SortField>>({
    key: "votingPower",
    direction: "DESC",
  });
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [messages, setMessages] = useState<any[]>([]);
  const convRef = useRef(null);

  const [client, setClient] = useState<Client | null>(null);
  const { data: delegatesByVault = {} } = useDelegatesByVault();
  const broadcastMessage = useBroadcast();

  // Memoized to prevent invalidating sortedVoters on every render.
  const delegateAddresses = useMemo(
    () => Object.values(delegatesByVault).map(({ address }) => address),
    [delegatesByVault],
  );

  const { sortedDelegates, sortedVoters } = useMemo(() => {
    let sorted = voters;
    const { key, direction } = sortOptions;

    if (direction) {
      switch (key) {
        case "numberOfDelegators":
          sorted = voters
            .slice()
            .sort((a, b) => a.numberOfDelegators - b.numberOfDelegators);
          break;

        case "votingPower":
        default:
          sorted = voters
            .slice()
            .sort((a, b) => +a.votingPower - +b.votingPower);
          break;
      }

      if (direction === "DESC") {
        sorted.reverse();
      }
    }

    return {
      sortedDelegates: sorted.filter(({ address }) =>
        delegateAddresses.includes(address),
      ),
      sortedVoters: sorted.filter(
        ({ address }) => !delegateAddresses.includes(address),
      ),
    };
  }, [sortOptions, voters, delegateAddresses]);

  const { data: signer } = useSigner();

  const newConversation = async function (xmtp_client: any, addressTo: string) {
    //Creates a new conversation with the address
    if (await xmtp_client?.canMessage(addressTo)) {
      try {
        const conversation = await xmtp_client.conversations.newConversation(
          addressTo,
        );
        convRef.current = conversation;

        //Loads the messages of the conversation
        const messagesToAdd = await conversation.messages();
        console.log({ messagesToAdd, xmtp_client });
        setMessages([...messages, ...messagesToAdd]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("cant message because is not on the network.");
      //cant message because is not on the network.
    }
  };

  const getMessageList = (messages: any[]) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );

    return (
      <ul className="messageList">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className="messageItem"
            title="Click to log this message to the console"
          >
            <strong>
              {/* {message.senderAddress === address ? "You" : message.senderAddress}: */}
              {message.senderAddress}:
            </strong>
            <span>{message.content}</span>
            <span className="date"> ({message.sent.toLocaleTimeString()})</span>
            <span className="eyes" onClick={() => console.log(message)}>
              👀
            </span>
          </li>
        ))}
      </ul>
    );
  };
  const handleRadioChange = (address: any) => {
    setSelectedVoter(address);
  };

  const handleDelegateClick = () => {
    broadcastMessage(
      client,
      [selectedVoter],
      `The User ${client?.address} delegates his vote to you `,
    );
  };

  const initXmtp = async function () {
    // Create the XMTP client
    console.log;
    if (!signer) {
      return;
    }
    const xmtp = await Client.create(signer as Signer);
    //Create or load conversation with Gm bot
    voters
      .filter((user: any) => user.address !== xmtp.address)
      .forEach((user: any) => {
        newConversation(xmtp, user.address);
      });
    // Set the XMTP client in state for later use
    //Set the client in the ref
    setClient(xmtp);
  };

  useEffect(() => {
    // Function to stream new messages in the conversation
    const streamMessages = async () => {
      if (
        convRef.current &&
        typeof convRef.current["streamMessages"] === "function"
      ) {
        const newStream = await (convRef.current as any).streamMessages();
        for await (const msg of newStream) {
          const exists = messages.find((m) => m.id === msg.id);
          if (!exists) {
            setMessages((prevMessages) => {
              const msgsnew = [...prevMessages, msg];
              return msgsnew;
            });
          }
        }
      }
    };
    streamMessages();
  }, [messages]);
  useEffect(() => {
    initXmtp();
  }, [signer]);

  return (
    <div className="min-w-[250px]">
      <SortableGridTable
        headingRowClassName="grid-cols-[1.5fr_1fr_1fr_56px]"
        bodyRowClassName="group grid-cols-[1.5fr_1fr_1fr_56px]"
        emptyTableElement={
          <h2 className="mt-4 text-lg text-center">No voters to show</h2>
        }
        onSort={setSortOptions}
        defaultSortOptions={sortOptions}
        cols={[
          "Voter",
          {
            cell: "# of Delegators",
            sortKey: "numberOfDelegators",
          },
          {
            cell: "Voting Power",
            sortKey: "votingPower",
          },
          "", // extra column for the chevron
        ]}
        rows={[
          ...sortedDelegates.map(
            ({ address, ensName, votingPower, numberOfDelegators }, i) => {
              const isLastDelegate = i === sortedDelegates.length - 1;
              return {
                href: makeVoterURL(address),
                cells: [
                  <VoterAddress
                    key={address}
                    address={address}
                    ensName={ensName}
                  />,
                  numberOfDelegators,
                  formatBalance(votingPower, 0),
                  <span key={`${address}-chevron`}>
                    <ChevronRightIcon className="w-6 h-6 transition-all stroke-current opacity-40 group-hover:opacity-100" />
                  </span>,
                ],
                className: isLastDelegate
                  ? "border-b border-accent"
                  : undefined,
              };
            },
          ),

          ...sortedVoters
            .slice(0, size - sortedDelegates.length)
            .map(({ address, ensName, votingPower, numberOfDelegators }) => {
              return {
                href: makeVoterURL(address),
                cells: [
                  <VoterAddress
                    key={address}
                    address={address}
                    ensName={ensName}
                  />,
                  numberOfDelegators,
                  formatBalance(votingPower, 0),
                  <span key={`${address}-chevron`}>
                    <ChevronRightIcon className="w-6 h-6 transition-all stroke-current opacity-40 group-hover:opacity-100" />
                  </span>,
                ],
              };
            }),
        ]}
      />
      {/* {selectedVoter && <button
            className="daisy-btn daisy-btn-primary"
            onClick={handleDelegateClick}
          > Delegate to {selectedVoter}</button>} */}

      {voters.length > size && (
        <div className="flex flex-col justify-center gap-4 py-8 text-center">
          <div className="font-medium">
            Only showings {size} voters, click to load more or refine using
            search.
          </div>
          <button
            className="daisy-btn daisy-btn-primary"
            onClick={() => onSizeChange(size + 50)}
          >
            Load more
          </button>
        </div>
      )}
      <Chat
        client={client}
        conversation={convRef.current}
        messageHistory={messages}
        addresses={voters.map(({ address }) => address)}
      />
    </div>
  );
}
