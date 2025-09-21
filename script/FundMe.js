const { ethers } = require("hardhat") 
const hre = require("hardhat"); 
const { etherscan } = require("../hardhat.config");

async function main() {
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
    const account=await ethers.getSigner()
    const TX= await fundMe.fund({value: ethers.utils.parseEther("0.5")})
    await TX.wait()
    console.log(`one account is ${account.address} `)
    const balanceoffundme=await fundMe.provider.getBalance(fundMe.address)
    console.log(`the balance of contract is ${balanceoffundme}`)
    const balanceofaccount=await fundMe.FundertoAcount(account.address)
    console.log(`the balance of account is ${balanceofaccount}`)
    await fundMe.deployTransaction.wait(10)
    const getfundend=await fundMe.getfund()
    await getfundend.wait()
    console.log("getfund success")

}

// import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

async function verifyfundme(fundMeaddr,args) {
  await hre.run("verify:verify", {
  address: fundMeaddr,
  constructorArguments: args,
});
}

main().then().catch((error)=>{
    console.error(error)
    process.exit(0)
})