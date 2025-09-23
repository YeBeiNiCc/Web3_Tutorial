
const { network } = require("hardhat")
const {DECIMAL,INITIAL_ANSWER,networkConfig, deploymentsChainId} =require("../helper-hardhat-config")
module.exports=async (getNamedAccounts,deployments) => {
    const {account1}=getNamedAccounts
    const {deploy} = deployments
    if(deploymentsChainId.includes(network.name)){
        await deploy ("MockV3Aggregator",{
        from: account1,
        args: [DECIMAL,INITIAL_ANSWER],
        log: true
        })
    }else{
        console.log("you are not deploy on local")
    }
    
}
module.exports.tags=["all","mock"]