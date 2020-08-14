let CoinFlip = artifacts.require('./CoinFlip.sol');
let CoinFlipAttack = artifacts.require('./CoinFlipAttack.sol');
// import assert from 'assert';

module.exports = function (deployer) {
  deployer.deploy(CoinFlip);
  deployer.deploy(CoinFlipAttack);
  // await CoinFlipAttack.setVictim(CoinFlip.address);
  // for (let i = 0; i < 10; ++i) {
  //   await CoinFlipContract.flip().call();
  // }

  // let wins = await CoinFlipContract.consecutiveWins().call();
  // // assert(parseInt(wins), 10);
  // console.log(`Total wins: ${wins}`);
};
