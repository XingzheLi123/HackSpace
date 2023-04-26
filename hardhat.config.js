require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mantle: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
