var Bank = artifacts.require("./Bank.sol");

module.exports = function(deployer, network, accounts) {  
  deployer.deploy(Bank);

  // deployer.deploy(Bank).then(function(){
  //   // console.log(Bank.address);
  // });
};
