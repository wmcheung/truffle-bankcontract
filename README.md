# Bank Contract with Truffle Framework and ReactJS

A bank contract, a simple smart contract for depositing and withdrawing ether. A good easy way of learning the very basic of Solidity and using Web3.js.

## Requirements
* Truffle framework
* Ganache or Ganache CLI
* NPM
* MetaMask
* Infura.io (for deploying to testnet)

## Installation
* ```npm install```

* Rename truffle-config.js to truffle.js if using Mac, Windows uses truffle-config.js.

* Change ```mnemonic``` to your seed phrase

* ```truffle compile``` (compile solidity into json)

* ```truffle migrate``` (use --network ropsten or --network development. For development, remember to have Ganache turned on)

* ```npm start``` (start the dApp)
