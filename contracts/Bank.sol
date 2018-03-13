pragma solidity ^0.4.19;

// import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
// import "zeppelin-solidity/contracts/ownership/Ownable.sol";
// import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Bank {
  
  // using SafeMath for uint256;
  mapping (address => uint) private balances;

  // address public owner;

  function Bank() public {
    // owner = msg.sender;
  }

  function deposit() payable public returns (uint) {
    require((balances[msg.sender] + msg.value) >= balances[msg.sender]);
    
    balances[msg.sender] += msg.value;
    return balances[msg.sender];
  }

  function withdraw(uint256 _amount) public returns (uint balance) {
    require(_amount <= balances[msg.sender]);

    balances[msg.sender] -= _amount;
    msg.sender.transfer(_amount);

    return balances[msg.sender];
  }

  function balance() view public returns (uint) {
    return balances[msg.sender];
  }
}
