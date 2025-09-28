const {deployments}=require("hardhat-deploy")
const { network } = require("hardhat")
const { DECIMAL, INITIAL_ANSWER, networkConfig, deploymentsChainId } = require("../helper-hardhat-config")
module.exports = async ({getNamedAccounts, deployments}) => {

    if (deploymentsChainId.includes(network.name)) {
        const { account1 } = await getNamedAccounts()
        const deploy  = deployments.deploy

        await deploy("MockV3Aggregator", {
            from: account1,
            args: [DECIMAL, INITIAL_ANSWER],
            log: true
        })
    } else {
        console.log("you are not deploy on local")
    }

}
module.exports.tags = ["all", "mock"]