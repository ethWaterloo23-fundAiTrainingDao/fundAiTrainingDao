export const AUCTION_EXAMPLE = `
//Avoids "pushing" balance to users favoring "pull" architecture
function bid() payable external {
  require(msg.value > currentBid);

  if (currentFrontrunner != 0) {
    refunds[currentFrontrunner] += currentBid;
  }

  currentFrontrunner = msg.sender;
  currentBid         = msg.value;
}

//Allows users to get their refund from auction
function withdraw() external {
  //Do all state manipulation before external call to
  //avoid reentrancy attack
  uint refund = refunds[msg.sender];
  refunds[msg.sender] = 0;

  msg.sender.send(refund);
}
`;

export const RAND_EXAMPLE = `

function random(uint Max) constant private returns (uint256 result){
    //get the best seed for randomness
    uint256 x = salt * 100 / Max;
    uint256 y = salt * block.number / (salt % 5) ;
    uint256 seed = block.number/3 + (salt % 300) + Last_Payout +y; 
    uint256 h = uint256(block.blockhash(seed)); 

    return uint256((h / x)) % Max + 1; //random number between 1 and Max
}



//---Contract management functions
function ChangeOwnership(address _owner) onlyowner {
    admin = _owner;
}
function WatchBalance() constant returns(uint TotalBalance) {
    TotalBalance = Balance /  1 wei;
}

function WatchBalanceInEther() constant returns(uint TotalBalanceInEther) {
    TotalBalanceInEther = Balance /  1 ether;
}


//Fee functions for creator
function CollectAllFees() onlyowner {
    if (fees == 0) throw;
    admin.send(fees);
    feeFrac-=1;
    fees = 0;
}`;

export const INTEGER_EXAMPLE = `
contract IntegerOverflow {
    uint private sellerBalance = 0;
    
    function add(uint value) returns (bool){
        sellerBalance += value; // possible overflow
    } 

    function safe_add(uint value) returns (bool){
        require(value + sellerBalance >= sellerBalance);
        sellerBalance += value; 
    } 
}
`;
