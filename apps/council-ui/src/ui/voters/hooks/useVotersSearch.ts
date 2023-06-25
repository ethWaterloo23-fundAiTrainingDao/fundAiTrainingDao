import { useEffect, useMemo, useRef, useState } from "react";
import { VoterRowData } from "src/ui/voters/types";

const voterSearchFuseOptions = {
  threshold: 0.3,
  isCaseSensitive: false,
  ignoreLocation: true,
  keys: ["address", "ensName"],
};

interface VoterSearch {
  results: VoterRowData[];
  reset: () => void;
  search: (i: string) => void;
}

export function useVotersSearch(
  voters: VoterRowData[] | undefined,
): VoterSearch {
  const [input, setInput] = useState("");
  const searchCache = useRef<Record<string, VoterRowData[]>>({});

  // Reset the cache when the provided data changes.
  useEffect(() => {
    searchCache.current = {};
  }, [voters]);

  const results = useMemo(() => {
    return [
      {
        address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        ensName: "john.eth",
        votingPower: "100",
        numberOfDelegators: 5,
        isGSCMember: true,
      },
      {
        address: "0xE2164Ed24D1119dc0cb8A66D8C96fF7cf822bdef",
        ensName: null,
        votingPower: "50",
        numberOfDelegators: 0,
        isGSCMember: false,
      },
      {
        address: "0xd183afe5c9f64dC0C64eA0abd1D7c65301412FB8",
        ensName: "alice.eth",
        votingPower: "200",
        numberOfDelegators: 10,
        isGSCMember: true,
      },
    ];
    // if (!input) {
    //   return voters || [];
    // }
    // const fuse = new Fuse(voters || [], voterSearchFuseOptions);

    // if (searchCache.current[input]) {
    //   return searchCache.current[input];
    // }

    // const filtered = fuse.search(input).map((result) => result.item);
    // searchCache.current[input] = filtered;

    // return filtered;
  }, [input, voters]);

  return {
    results,
    reset: () => setInput(""),
    search: setInput,
  };
}
