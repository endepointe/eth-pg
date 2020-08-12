// SPDX-License-Identifier: MIT
pragma solidity >=0.4.15 <0.7.0;

import "./SafeMath.sol";

contract CoinFlip {
    using SafeMath for uint256;
    address public owner;
    uint256 value;
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() public {
        consecutiveWins = 0;
        owner = msg.sender;
    }

    function flip(bool _guess) public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }

    function sendTest(uint256 _value) public returns (uint256) {
        value = _value;
        return value;
    }

    function test() public view returns (address) {
        return (owner);
    }
}
