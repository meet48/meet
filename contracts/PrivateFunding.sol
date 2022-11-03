// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev PrivateFunding.
 */
contract PrivateFunding is Ownable {
    IERC20 public Meet;
    uint256 public endDate;

    event SetMeet(address _meet);

    constructor() {
        // Lock-up time is 6 months.
        endDate = block.timestamp + 180 days;
    }

    function setMeet(IERC20 _meet) external onlyOwner {
        Meet = _meet;
        emit SetMeet(address(_meet));
    }

    function balance() external view returns (uint256) {
        require(address(Meet) != address(0) , "Zero address");
        return Meet.balanceOf(address(this));
    }

    function withdraw(address to , uint256 amount) external onlyOwner {
        require(to != address(0) , "Zero address");
        require(block.timestamp >= endDate , "It's not unlocked yet");
        
        Meet.transfer(to , amount);
    }


}

