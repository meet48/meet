const { expect } = require("chai");

describe("Meet", function () {
    // deploy contract
    async function deploy() {
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

        return { meet, advisors, privateFunding, seed, team, owner};
    }

    let meet, advisors, privateFunding, seed, team, owner;

    this.beforeAll(async function () {
        const contracts = await deploy();
        meet = contracts.meet;
        advisors = contracts.advisors;
        privateFunding = contracts.privateFunding;
        seed = contracts.seed;
        team = contracts.team;
        owner = contracts.owner;
    }, 10000);

    it("Token amount", async function () {
        const total = await meet.totalSupply();

        const advisorsAmount = await meet.balanceOf(advisors.address).then((ret) => {
            return ret;
        });
        const privateFundingAmount = await meet.balanceOf(privateFunding.address).then((ret) => {
            return ret;
        });
        const seedAmount = await meet.balanceOf(seed.address).then((ret) => {
            return ret;
        });
        const teamAmount = await meet.balanceOf(team.address).then((ret) => {
            return ret;
        });
        const ownerAmount = await meet.balanceOf(owner.address).then((ret) => {
            return ret;
        });
        
        expect(advisorsAmount.add(privateFundingAmount).add(seedAmount).add(teamAmount).add(ownerAmount)).to.equal(total);
    });
    
    it("advisors" , async function () {
        await advisors.setMeet(meet.address);
        expect(await advisors.Meet().then((ret) => {return ret.toLowerCase()})).to.equal(meet.address.toLowerCase());
    });
    
    it("advisors balance" , async function () {
        const total = await meet.totalSupply().then((ret) => {return ret});
        expect(await meet.balanceOf(advisors.address).then((ret) => {return ret})).to.equal(total.mul(3).div(100));
    });





});