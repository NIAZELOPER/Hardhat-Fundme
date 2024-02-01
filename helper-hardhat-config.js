const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  137: {
    name: "polygon",
    ehtUsdPriceFeed: "0xbE23a3AA13038CfC28aFd0ECe4FdE379fE7fBfc4",
  },
};
DECIMALS = 8;
INITIAL_ANSWER = 252600000000;

const Developement_Chain = ["localhost", "hardhat"];

module.exports = {
  networkConfig,
  DECIMALS,
  INITIAL_ANSWER,
  Developement_Chain,
};
