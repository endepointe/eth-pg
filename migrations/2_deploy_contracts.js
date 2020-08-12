let CoinFlip = artifacts.require('./CoinFlip.sol');
let CoinFlipAttack = artifacts.require('./CoinFlipAttack.sol');

module.exports = function (deployer) {
  deployer.deploy(CoinFlip);
  deployer.deploy(CoinFlipAttack);
};
