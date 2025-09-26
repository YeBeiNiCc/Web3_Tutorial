// const env = require("hardhat");
require("@chainlink/env-enc").config();
require("@nomicfoundation/hardhat-toolbox");
require("./tasks");
require("hardhat-deploy");
const SEPOLIA_URL=process.env.SEPOLIA_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY
const SEPOLIA_API_KEY=process.env.SEPOLIA_API_KEY
const PRIVATE_KEY_CC=process.env.PRIVATE_KEY_CC
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  mocha: {
    timeout: 3000000
  },
  networks: {
    sepolia: {
      url:SEPOLIA_URL,
    accounts: [PRIVATE_KEY,PRIVATE_KEY_CC],
    chainId:11155111,
    gas: "auto",
    gasPrice: "auto",
    gasMultiplier: 2, // 自动将gas价格提高2倍
    minGasPrice: 10000000000 // 最低gas价格设置
    }
  },
  etherscan: {
    apiKey: SEPOLIA_API_KEY
 },

 namedAccounts: {
  account1:{
    default:0
  },
  account2:{
    default:1
  }
 }
}
