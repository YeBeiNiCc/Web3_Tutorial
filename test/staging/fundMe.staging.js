const { assert, expect } = require("chai")
const { deployments, getNamedAccounts, ethers, network } = require("hardhat")
const helpers = require("@nomicfoundation/hardhat-network-helpers")
const { deploymentsChainId } = require("../../helper-hardhat-config")
deploymentsChainId.includes(network.name) ? 
describe.skip : 
describe("test FundMe contract", async function () {
    let fundMe
    let account
    beforeEach(async function () {
        await deployments.fixture(["all"])
        account = (await getNamedAccounts()).account1
        fundMedeploy = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt("FundMe", fundMedeploy.address)
    })
    // staging test fund and getfund successfully
    it("staging test fund and getfund sucessfully ",async function () {
        await fundMe.fund({value: ethers.utils.parseEther("0.5")})
        await new Promise(resolve => setTimeout(resolve,200*1000))
        const fundTX=await fundMe.getfund()
        const fundTXwait= await fundTX.wait()
        expect(fundTXwait).to.emit(fundMe,"getFundEvent").withArgs(ethers.utils.parseEther("0.5"))
    })

    //staging test fund and refund successfully
    it("staging test fund and refund successfully",async function () {
        await fundMe.fund({value: ethers.utils.parseEther("0.1")})
        await new Promise(resolve => setTimeout(resolve,200*1000))
        const fundTX=await fundMe.refund()
        const fundTXwait= await fundTX.wait()
        expect(fundTXwait).to.emit(fundMe,"reFundEvent").withArgs(ethers.utils.parseEther("0.1"))
    })

})
