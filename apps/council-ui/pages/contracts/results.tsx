// This UI element presents the results from a contract analysis.
// A result data looks like this
// {"results":{"ids":[["vulnerabilities/not-so-smart-contracts/reentrancy/Reentrancy.sol","vulnerabilities/not-so-smart-contracts/denial_of_service/list_dos.sol","vulnerabilities/not-so-smart-contracts/honeypots/VarLoop/VarLoop.sol"]],"embeddings":null,"documents":[["pragma solidity ^0.4.15;\n\ncontract Reentrance {\n    mapping (address => uint) userBalance;\n   \n    function getBalance(address u) constant returns(uint){\n        return userBalance[u];\n    }\n\n    function addToBalance() payable{\n        userBalance[msg.sender] += msg.value;\n    }   \n\n    function withdrawBalance(){\n        // send userBalance[msg.sender] ethers to msg.sender\n        // if mgs.sender is a contract, it will call its fallback function\n        if( ! (msg.sender.call.value(userBalance[msg.sender])() ) ){\n            throw;\n        }\n        userBalance[msg.sender] = 0;\n    }   \n\n    function withdrawBalance_fixed(){\n        // to protect against re-entrancy, the state variable\n        // has to be change before the call\n        uint amount = userBalance[msg.sender];\n        userBalance[msg.sender] = 0;\n        if( ! (msg.sender.call.value(amount)() ) ){\n            throw;\n        }\n    }   \n\n    function withdrawBalance_fixed_2(){\n        // send() and transfer() are safe against reentrancy\n        // they do not transfer the remaining gas\n        // and they give just enough gas to execute few instructions    \n        // in the fallback function (no further call possible)\n        msg.sender.transfer(userBalance[msg.sender]);\n        userBalance[msg.sender] = 0;\n    }   \n   \n}\n\n","pragma solidity ^0.4.15;\n\ncontract CrowdFundBad {\n  address[] private refundAddresses;\n  mapping(address => uint) public refundAmount;\n\n  function refundDos() public {\n    for(uint i; i < refundAddresses.length; i++) {\n      require(refundAddresses[i].transfer(refundAmount[refundAddresses[i]]));\n    }\n  }\n}\n\ncontract CrowdFundPull {\n  address[] private refundAddresses;\n  mapping(address => uint) public refundAmount;\n\n  function withdraw() external {\n    uint refund = refundAmount[msg.sender];\n    refundAmount[msg.sender] = 0;\n    msg.sender.transfer(refund);\n  }\n}\n\n\n//This is safe against the list length causing out of gas issues\n//but is not safe against the payee causing the execution to revert\ncontract CrowdFundSafe {\n  address[] private refundAddresses;\n  mapping(address => uint) public refundAmount;\n  uint256 nextIdx;\n  \n  function refundSafe() public {\n    uint256 i = nextIdx;\n    while(i < refundAddresses.length && msg.gas > 200000) {\n      refundAddresses[i].transfer(refundAmount[i]);\n      i++;\n    }\n    nextIdx = i;\n  }\n}\n","pragma solidity ^0.4.18;\n\ncontract Test1\n{\n    address owner = msg.sender;\n    \n    function withdraw()\n    payable\n    public\n    {\n        require(msg.sender==owner);\n        owner.transfer(this.balance);\n    }\n    \n    function() payable {}\n    \n    function Test()\n    payable\n    public\n    {\n        if(msg.value>=1 ether)\n        {\n            \n            var i1 = 1;\n            var i2 = 0;\n            var amX2 = msg.value*2;\n            \n            while(true)\n            {\n                if(i1<i2)break;\n                if(i1>amX2)break;\n                \n                i2=i1;\n                i1++;\n            }\n            msg.sender.transfer(i2);\n        }\n    }\n}\n"]],"metadatas":[[{"source":"vulnerabilities/not-so-smart-contracts/reentrancy/Reentrancy.sol"},{"source":"vulnerabilities/not-so-smart-contracts/denial_of_service/list_dos.sol"},{"source":"vulnerabilities/not-so-smart-contracts/honeypots/VarLoop/VarLoop.sol"}]],"distances":[[0.9513698816299438,0.9603927731513977,0.9846216440200806]]}}

import { ReactElement } from "react";
import HoverModal from "./hover";

interface ResultsProps {
  data: any;
}

export default function Results({ data }: ResultsProps): ReactElement {
  if (!data) {
    return <div></div>;
  }
  if (data.hasOwnProperty("error") || !data.hasOwnProperty("results")) {
    return (
      <div className="bg-gray-100 p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Analysis Results:</h2>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    );
  }

  const results = data["results"];
  const ids = results["ids"][0];
  const documents = results["documents"][0];
  const metadatas = results["metadatas"][0];
  const distances = results["distances"][0];
  const numResults = ids.length;
  console.log(ids);

  return (
    <div className="bg-gray-100 p-4 mt-4">
      <h2 className="text-lg font-bold mb-2">Analysis Results:</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Document
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Match likelihood
                    </th>
                  </tr>
                </thead>
                {
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.from({ length: numResults }, (_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {extractFilename(ids[i])}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <HoverModal title={ids[i]} text={documents[i]} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cosineToPercentage(distances[i])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function extractFilename(path: string): string {
  const segments = path.toString().split("/");
  const filenameWithExtension = segments[segments.length - 1];
  const filename = filenameWithExtension.split(".")[0];
  return filename;
}
function cosineToPercentage(decimal: string): ReactElement {
  const cosine_distance = parseFloat(decimal);
  const percentage_match = (1 - cosine_distance) * 100;
  //   if percentage > 30 then it's most likely a good match, so we'll make it red
  if (percentage_match > 30) {
    return (
      <span className="text-red-500">{`${percentage_match.toFixed(2)}%`}</span>
    );
  }
  if (percentage_match > 10) {
    return (
      <span className="text-yellow-500">{`${percentage_match.toFixed(
        2,
      )}%`}</span>
    );
  }
  if (percentage_match < 0) {
    return (
      <span className="text-gray-500">{`${percentage_match.toFixed(2)}%`}</span>
    );
  }
  return <span>{`${percentage_match.toFixed(2)}%`}</span>;
}
