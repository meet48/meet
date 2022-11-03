// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Meet.
 */
contract Meet is ERC20, ERC20Burnable, Ownable {
    address public advisors;
    address public privateFunding;
    address public seed;
    address public team;

    constructor(
        address _advisors,
        address _privateFunding,
        address _seed,
        address _team,
        address _owner
    ) ERC20("Meet48 MEET", "MEET") {
        uint256 total = 10 ** 26 * 48;

        // advisors
        _mint(advisors = _advisors , total * 3 / 100);

        // private funding
        _mint(privateFunding = _privateFunding , total * 8 / 100);

        // seed
        _mint(seed = _seed , total * 5 / 100);

        // team
        _mint(team = _team , total * 19 / 100);

        uint256 amount = total - balanceOf(advisors) - balanceOf(privateFunding) - balanceOf(seed) - balanceOf(team);
        _mint(_owner , amount);
    }


}
