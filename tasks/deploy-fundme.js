const {task}=require("hardhat/config")
task ("deploy-fundme","deploy and verify fundme contract").setAction(async (taskargs,hre)=>{
const chainId = hre.network.config.chainId;
  
  console.log("当前链ID:", chainId);
  console.log("API密钥:", process.env.SEPOLIA_API_KEY || "未配置");

    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("FundMe is deploying")
    const fundMe = await fundMeFactory.deploy(300)
    await fundMe.deployed()
    console.log(`FundMe contract has been deployed that address is ${fundMe.address}`)
    if(chainId==11155111&&process.env.SEPOLIA_API_KEY){
      console.log("pleace waitting for 5 comfirmtions")
      await fundMe.deployTransaction.wait(5)
      // console.log("------------")
      await verifyfundme(fundMe.address,[300])
    }else{
      console.log("verification skipped ...")
    }
})
async function verifyfundme(fundMeaddr,args) {
  await hre.run("verify:verify", {
  address: fundMeaddr,
  constructorArguments: args,
});
}
