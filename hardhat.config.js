require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
console.log(process.env.MANTLE_URL)
module.exports = {
  solidity: "0.8.18",
  networks: {
    mantle: {
      url: process.env.MANTLE_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
