// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Seed.
 */
contract Seed is Ownable {

    IERC20 public Meet;
    uint256 public total;
    struct LockUp {
        uint256 endDate;
        uint256 num;
    }
    LockUp[] public lockUps;

    event SetMeet(address _meet);

    constructor() {
        init();
    }

    function setMeet(IERC20 _meet) external onlyOwner {
        Meet = _meet;
        emit SetMeet(address(_meet));
    }

    function balance() external view returns (uint256) {
        require(address(Meet) != address(0) , "Zero address");
        return Meet.balanceOf(address(this));
    }

    function init() internal {
        uint256 meetTotal = 10 ** 26 * 48;

        // 5% of the total.
        total = meetTotal * 5 / 100;

        // 1% lock-up time for 6 months.
        LockUp memory lu1;
        lu1.endDate = block.timestamp + 180 days;
        lu1.num = meetTotal / 100;
        lockUps.push(lu1);

        // 4% lock-up time for 2 years.
        LockUp memory lu2;
        lu2.endDate = block.timestamp + 730 days;
        lu2.num = meetTotal * 4 / 100;
        lockUps.push(lu2);
    }

    function withdraw(address to , uint256 amount) external onlyOwner {
        require(to != address(0) , "Zero address");
        uint256 _balance = Meet.balanceOf(address(this));
        uint256 transferNum = (total > _balance)? total - _balance : 0;
        uint256 canNum;
        if(block.timestamp > lockUps[0].endDate){
            canNum += lockUps[0].num;
        }
        if(block.timestamp > lockUps[1].endDate){
            canNum += lockUps[1].num;
        }

        require(canNum > 0 , "It's not unlocked yet");
        require(transferNum + amount <= canNum , "The amount withdrawn exceeds the amount unlocked");

        Meet.transfer(to , amount);
    }

}

