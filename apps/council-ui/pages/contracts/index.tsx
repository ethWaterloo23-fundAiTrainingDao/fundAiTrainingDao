import { ReactElement, useState } from "react";
import { Page } from "src/ui/base/Page";
import { useSigner } from "wagmi";
import { AUCTION_EXAMPLE, INTEGER_EXAMPLE, RAND_EXAMPLE } from "./examples";
import Results from "./results";
import { queryVectorBackend } from "./xmtp";

interface ContractProps {
  solCode: string;
}

export function Contract({ solCode }: ContractProps): ReactElement {
  const [results, setResults] = useState<JSON>();
  const [isLoading, setIsLoading] = useState(false);
  const { data: signer } = useSigner();

  if (!signer) {
    return <div>Connect your wallet to use this feature</div>;
  }

  const analyzeContract = async () => {
    const contractCode = solCode;
    setIsLoading(true);

    const response = await queryVectorBackend(signer, contractCode);
    if (!response) {
      setIsLoading(false);
      return;
    }
    // make json out of response
    const json = JSON.parse(response);
    setResults(json);
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
