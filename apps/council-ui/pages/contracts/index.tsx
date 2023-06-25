import { ReactElement, useState } from "react";
import { Page } from "src/ui/base/Page";
import { AUCTION_EXAMPLE, INTEGER_EXAMPLE, RAND_EXAMPLE } from "./examples";
import Results from "./results";

const AI_BACKEND = "http://35.238.33.72:8000";

interface ContractProps {
  solCode: string;
}

export function Contract({ solCode }: ContractProps): ReactElement {
  const [results, setResults] = useState<JSON>();
  const [isLoading, setIsLoading] = useState(false);

  const analyzeContract = async () => {
    const contractCode = solCode;

    const url = `${AI_BACKEND}/?text=${encodeURIComponent(contractCode)}`;

    setIsLoading(true);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ contractCode }),
    });

    const data = await response.json();
    setResults(data);
    setIsLoading(false);
  };

  return (
    <Page>
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold">
          Paste your Solidity smart contract code here to analyze it with AI
        </h1>
        <h2 className="text-lg">
          The code will be compared with known vulnerable contracts and you will
          see a list of closest matches.
        </h2>
        <textarea
          id="contract-textarea"
          className="w-1/2 h-80 
          p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="pragma"
        >
          {solCode}
        </textarea>
        <button
          className="daisy-btn daisy-btn-primary"
          onClick={analyzeContract}
        >
          Analyze
        </button>
        {isLoading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Analyzing...
            </span>
          </div>
        ) : (
          results && <Results data={results} />
        )}
      </div>
    </Page>
  );
}

export default function ContractAll(): ReactElement {
  return (
    <>
      <Contract solCode={AUCTION_EXAMPLE} />
      <Contract solCode={RAND_EXAMPLE} />
      <Contract solCode={INTEGER_EXAMPLE} />
    </>
  );
}
