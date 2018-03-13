var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  networks: {

    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5778", // Match any network id,
      // from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732"
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/<API KEY>")
      },
      network_id: 3,
      gas: 4512388,
    }   
  }
};