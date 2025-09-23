const { assert, expect } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { LOCK_TIME, MINVALUES } = require("../helper-hardhat-config")
const helpers = require("@nomicfoundation/hardhat-network-helpers")
describe("test FundMe contract", async function () {
    let fundMe
    let account
    let account_cc
    let lock_time = LOCK_TIME
    let minvalues = MINVALUES
    beforeEach(async function () {
        await deployments.fixture(["all"])
        account = (await getNamedAccounts()).account1
        account_cc=(await getNamedAccounts()).account2
        fundMedeploy = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt("FundMe", fundMedeploy.address)
        fundMeSecond= fundMe.connect(account_cc)
    })
    it("test if Owner is msg.sender", async function () {
        assert.equal((await fundMe.Owner()), account)
    })

    it("test fundme contract dataFeed that is we want", async function () {
        assert.equal((await fundMe.dataFeed()), "0x694AA1769357215DE4FAC081bf1f309aDC325306")
    })
    //fund fund-over fund-values
    it("test fund is over", async function () {
        await helpers.time.increase(200)
        await helpers.mine()
        expect(fundMe.fund({ value: ethers.utils.parseEther("0.1") })).to.be.revertedWith("Fund is over")
    })

    it("test fund minvalue is not enough", async function () {
        expect(fundMe.fund({ value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("don't have enough money")
    })
    it("test fund both time and value are enough", async function () {
        fundMe.fund({ value: ethers.utils.parseEther("0.5") })
    })

    //getfund not-owner fund-over value-not-enough
    it("test getfund not-owner", async function () {
        expect(fundMeSecond.getfund()).to.be.revertedWith("you are not Owner")
    })

    it("test getfund fund-over", async function () {
        await helpers.time.increase(200)
        await helpers.mine()
        expect(fundMe.getfund()).to.be.revertedWith("Fund is over")
    })

    it("test getfund value-not-enough",async function () {
        fundMe.fund({value: ethers.utils.parseEther("1")})
        expect(fundMe.getfund()).to.be.revertedWith("fund is not enough")
    })

    //refund fund-enough fund-not-enough refund-seccond
    it("test refund fund-enough",async function () {
        fundMe.fund({value: ethers.utils.parseEther("1")})
        expect(fundMe.refund()).to.be.revertedWith("fund is  enough")
    })

    it("test refund fund-not-enough",async function () {
        fundMe.fund({value: ethers.utils.parseEther("0.01")})
        fundMe.refund()
    })

    it("test refund fund-seccond",async function () {
        fundMe.fund({value:ethers.utils.parseEther("0.01")})
        fundMe.refund()
        expect(fundMe.refund()).to.be.revertedWith("you are used refund")
    })
})