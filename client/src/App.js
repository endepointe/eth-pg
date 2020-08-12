import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import CoinFlipContract from './contracts/CoinFlip.json';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { test: '', web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoinFlipContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CoinFlipContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log(accounts);

    // Stores a given value, 5 by default.
    const someResponse = await contract.methods.sendTest(34).send({ from: accounts[5] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.test().call();

    // Update state with the result.
    this.setState({ test: response });

    console.log(someResponse);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>External account and contract owner address:</h1>
        <p>{this.state.test}</p>
      </div>
    );
  }
}

export default App;
