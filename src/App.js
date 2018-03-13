import React, { Component } from 'react'
import BankContract from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { log } from 'util';

class App extends Component {
  constructor(props) {
    super(props)

    const contract = require('truffle-contract')
    const bank = contract(BankContract)
    
    this.state = {
      
      bankContract: bank,
      bankInstance: null,
      balance: 0,
      
      deposit: {
        value: 0.1
      },

      withdraw: {
        value: 0
      },
      
      address: 0,
      isWalletUnlocked: false,
      web3: null
    }
    

    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdrawal = this.handleWithdrawal.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  /**
   * Check Balance in Bank Contract
   * 
   * @memberof App
   */
  checkBalance() {
    
    const self = this;
    
    this.state.bankContract.at(this.state.bankInstance.address).then(function(instance) {

      self.state.bankInstance.balance({from: self.state.address}).then(function(result){
        
        self.setState({balance: self.state.web3.fromWei(result.toNumber(), "ether")});  

      });
      
    });
    
  }


  handleDeposit(event) {
    const self = this;
    this.state.bankContract.at(this.state.bankInstance.address).then(function(instance) {

      self.createDeposit(instance);
      // instance.deposit({from: userAddress});

    });
    
    event.preventDefault();
  }

  createDeposit(bankInstance) {
    const self = this;

    const getGasPrice = this.state.web3.eth.getGasPrice(function(e,r){ return r.toNumber() })

    const stateData = {
      userAddress: this.state.address,
      userValue: this.state.web3.toWei(this.state.deposit.value, 'ether'),
    }

    const transactionObject = {
      from: stateData.userAddress,
      to: bankInstance.address,
      value: stateData.userValue,
      gasPrice: getGasPrice,
    }      
    
    bankInstance.deposit(transactionObject).then(function(receipt){
      
      console.log(receipt);

      if(receipt) {

        self.checkBalance()

      }

    });      

  }

  /**
   * handleDepositValueChange
   * handle the deposit value on change
   * 
   * @param {any} e 
   * @memberof App
   */
  handleDepositValueChange(e) {
    
    var state = {...this.state};
    state.deposit.value = e.target.value;
    
    this.setState(state, function(){
      // console.log(this.state.contract.deposit.value);    
    });
  
  }
  
  handleWithdrawal(event) {
  
    const self = this;

    const getGasPrice = this.state.web3.eth.getGasPrice(function(e,r){ return r.toNumber() })

    const stateData = {
      userAddress: this.state.address,
      userValue: this.state.web3.toWei(this.state.withdraw.value, 'ether'),
    }

    const transactionObject = {
      from: stateData.userAddress,
      to: this.state.bankInstance.address,
      gasPrice: getGasPrice,
    }      


    this.state.bankContract.at(this.state.bankInstance.address).then(function(instance) {
      
      instance.withdraw(stateData.userValue, transactionObject).then(function(receipt){

        console.log(receipt);

        if(receipt) {
          
          self.checkBalance();

        }

      });

    });    
    
    event.preventDefault();    
  }

  /**
   * handleWithdrawValueChange
   * handle the withdraw value on change
   * 
   * @param {any} e 
   * @memberof App
   */
  handleWithdrawValueChange(e) {
    
    var state = {...this.state};
    state.withdraw.value = e.target.value;
    
    this.setState(state, function(){
      // console.log(this.state.withdraw.value);    
    });
  
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    this.state.bankContract.setProvider(this.state.web3.currentProvider)
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      if(accounts[0] !== undefined) {

        this.setState({address: accounts[0]});
        this.setState({isWalletUnlocked: true});
        
        // console.log(accounts[0]);
        
      }  

    }); 

    // Set Instance
    this.state.bankContract.deployed().then((instance) => {

      var state = {...this.state};
      state.bankInstance = instance;

      this.setState(state);

      // Set Balance      
      this.checkBalance();

     });     
  }

  render() {
    const isWalletUnlocked = this.state.isWalletUnlocked;
    let showWalletStatus;

    if(isWalletUnlocked) {
      showWalletStatus = "Wallet is unlocked";
    }else{
      showWalletStatus = "Wallet is locked";
    }

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Bank contract</h1>
              <p>Your wallet is : {showWalletStatus} </p>
              <p>Current contract balance: {this.state.balance} ether</p>

              <hr/>

              <form onSubmit={this.handleDeposit}>
                <label>Create a deposit: <input type="text" value={this.state.deposit.value} onChange={this.handleDepositValueChange.bind(this)} /></label>  
                <input type="submit" value="Submit"/>
              </form>

              <form onSubmit={this.handleWithdrawal}>
                <label>Amount to withdraw: <input type="text" value={this.state.withdraw.value} onChange={this.handleWithdrawValueChange.bind(this)} /></label>  
                <input type="submit" value="Request withdrawal"/>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
