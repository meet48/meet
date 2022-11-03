// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // Advisors
    const Advisors = await hre.ethers.getContractFactory("Advisors");
    const advisors = await Advisors.deploy();
    await advisors.deployed();
    console.log("Advisors contract address : " + advisors.address);

    // Private funding
    const PrivateFunding = await hre.ethers.getContractFactory("PrivateFunding");
    const privateFunding = await PrivateFunding.deploy();
    await privateFunding.deployed();
    console.log("Private funding contract address : " + privateFunding.address);

    // Seed
    const Seed = await hre.ethers.getContractFactory("Seed");
    const seed = await Seed.deploy();
    await seed.deployed();
    console.log("Seed contract address : " + seed.address);

    // Team
    const Team = await hre.ethers.getContractFactory("Team");
    const team = await Team.deploy();
    await team.deployed();
    console.log("Team contract address : " + team.address);

    // Meet
    const [owner] = await ethers.getSigners();
    const Meet = await hre.ethers.getContractFactory("Meet");
    const meet = await Meet.deploy(advisors.address, privateFunding.address, seed.address, team.address, owner.address);
    await meet.deployed();
    console.log("Meet contract address : " + meet.address);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});




