
const { network } = require("hardhat")
const { LOCK_TIME, networkConfig, deploymentsChainId, CONFRIMATION } = require("../helper-hardhat-config")
const { networks } = require("../hardhat.config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy } = deployments
    let dataFeed;
    let confirmation;
    if (deploymentsChainId.includes(network.name)) {
        const mock = await deployments.get("MockV3Aggregator")
        dataFeed = mock.address
        confirmation = 0
    } else {
        dataFeed = networkConfig[network.config.chainId].ethUsdDataFeed
        confirmation = CONFRIMATION
    }

    const fundMe= await deploy("FundMe", {
        from: account1,
        args: [LOCK_TIME, dataFeed],
        log: true,
        waitConfirmations: confirmation
    })
    if(network.config.chainId== 11155111 && process.env.PRIVATE_KEY){
        await hre.run("verify:verify", {
        address: fundMe.address,
        constructorArguments: [LOCK_TIME, dataFeed],
    });
    }else{
        console.log("you are not deploy on sepolia,verification skipped ...")
    }
    
}
module.exports.tags = ["all"]