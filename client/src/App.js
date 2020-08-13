import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import CoinFlipContract from './contracts/CoinFlip.json';
import CoinFlipAttackContract from './contracts/CoinFlipAttack.json';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = {
    test: '',
    web3: null,
    accounts: null,
    coinFlipContract: null,
    coinFlipAttackContract: null,
    attackResults: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = CoinFlipContract.networks[networkId];
      // console.log(deployedNetwork);
      const coinFlipInstance = new web3.eth.Contract(
        CoinFlipContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedAttackNetwork = CoinFlipAttackContract.networks[networkId];
      // console.log(deployedAttackNetwork);
      const coinFlipAttackInstance = new web3.eth.Contract(
        CoinFlipAttackContract.abi,
        deployedAttackNetwork && deployedAttackNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        coinFlipContract: coinFlipInstance,
        coinFlipAttackContract: coinFlipAttackInstance
      }, this.runExample, this.flip);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const {
      // accounts,
      coinFlipContract,
      coinFlipAttackContract } = this.state;

    // Stores a given value, 5 by default.
    // const someResponse = await coinFlipContract.methods.sendTest(34).send({ from: accounts[3] });

    // Get the value from the contract to prove it worked.
    // console.log(coinFlipAttackContract._address);
    // const coinFlipResponse = await coinFlipContract.methods.getAddress().call();

    // Set the attack
    // coinFlipAttackContract.methods.setVictim(coinFlipContract._address).call();

    // console.log(await coinFlipAttackContract.methods.testFlip(false).call());

    // const coinFlipAttackResponse = await coinFlipAttackContract.methods.testFlip(true).call();

    // console.log(coinFlipAttackResponse);

    // Update state with the result.
    this.setState({
      // test: coinFlipResponse,
      // attack: coinFlipAttackResponse,
    });

    // console.log(coinFlipResponse);
    // console.log(this.state.test);
    // console.log("attack: ", this.state.attack);
  };

  flip = async (e) => {
    e.preventDefault();

    console.log(e.target.elements[0].value);
    let tf = false;
    if (e.target.elements[0].value === "t") {
      tf = true;
    }

    // Set the attack
    // coinFlipAttackContract.methods.setVictim(coinFlipContract._address).call();

    console.log(await this.state.coinFlipContract.methods.flip(tf).call());
    console.log(await this.state.coinFlipContract.methods.consecutiveWins().call());
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>External account and contract owner address:</h1>
        {/* <p>{this.state.test}</p> */}
        <form onSubmit={this.flip}>
          <input type="text" />
          <button>flip</button>
        </form>
      </div>
    );
  }
}

export default App;
