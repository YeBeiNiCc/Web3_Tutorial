
const {LOCK_TIME} =require("../helper-hardhat-config")
module.exports=async ({getNamedAccounts,deployments}) => {
    const {account1}=await getNamedAccounts()
    const {deploy} = deployments
    await deploy("FundMe",{
        from: account1,
        args: [180],
        log: true
    })
}
module.exports.tags = ["all"]