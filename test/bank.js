var Bank = artifacts.require("./Bank.sol");

contract('Bank', function(accounts) {
  it("Request Owner Address and deposit 2 ether", function() {
    return Bank.deployed().then(function(instance) {
      bankInstance = instance;
            
      return bankInstance.getOwnerAddress();
    }).then(function(instance) {
      bankInstance = instance;
            
      return bankInstance.deposit(2, {from: accounts[0]});
    });
  });
});

contract('Bank', function(accounts) {
  it("Withdraw 1 ether", function() {
    return Bank.deployed().then(function(instance) {
      bankInstance = instance;
            
      return bankInstance.withdraw(1, {from: accounts[0]});
    }).then(function(instance) {
      bankInstance = instance;

      currentBalance = bankInstance.getOwnerAddress();
      expectingValue = 1;

      assert.equal(currentBalance, expectingValue, "Address only has 1 ether left");
    });
  });
});
