import { ReactElement, useState } from "react";
import { Page } from "src/ui/base/Page";

const AI_BACKEND = "http://35.238.33.72:8000";

export default function Contract(): ReactElement | void {
  const [results, setResults] = useState("");

  const analyzeContract = async () => {
    const textarea = document.getElementById(
      "contract-textarea",
    ) as HTMLTextAreaElement;
    const contractCode = textarea.value;

    const url = `${AI_BACKEND}/?text=${encodeURIComponent(contractCode)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ contractCode }),
    });

    const data = await response.json();
    setResults(JSON.stringify(data));
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
          className="w-1/2 h-40 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="pragma"
        >
          Hold
        </textarea>
        <button
          className="daisy-btn daisy-btn-primary"
          onClick={analyzeContract}
        >
          Analyze
        </button>
        {results && (
          <div className="bg-gray-100 p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">Analysis Results:</h2>
            <pre>{results}</pre>
          </div>
        )}
      </div>
    </Page>
  );
}
