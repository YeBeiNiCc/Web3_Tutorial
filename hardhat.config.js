// const env = require("hardhat");
require("@chainlink/env-enc").config();
require("@nomicfoundation/hardhat-toolbox");
require("./tasks");
const SEPOLIA_URL=process.env.SEPOLIA_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY
const SEPOLIA_API_KEY=process.env.SEPOLIA_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url:SEPOLIA_URL,
    accounts: [PRIVATE_KEY],
    chainId:11155111
    }
  },
  etherscan: {
    apiKey: SEPOLIA_API_KEY
 }
}
