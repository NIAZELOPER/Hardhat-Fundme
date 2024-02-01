/*
async function deployfunc(hre) {
  console.log(`Nothings here`);
}
module.exports.default = deployfunc;
*/

/*
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  //hre.getNamedAccounts
  //hre.deployments
};
*/

const {
  networkConfig,
  Developement_Chain,
} = require("../helper-hardhat-config.js");
// Above line means same as:
// const helperconfig = require(".helper-hardhat-config.js");
// const networkConfig = helpercofig.networkConfig;
const { network } = require("hardhat");
const { verify } = require("../utils/verify.js");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const ChainId = network.config.chainId;
  let PriceFeedAddress;
  if (Developement_Chain.includes(network.name)) {
    const MockV3 = await deployments.get("MockV3Aggregator");
    PriceFeedAddress = MockV3.address;
  } else {
    PriceFeedAddress = networkConfig[ChainId]["ethUsdPriceFeed"];
  }

  const args = PriceFeedAddress;
  const Fundme = await deploy("FundMe", {
    from: deployer,
    args: [args],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!Developement_Chain.includes(network.name)) {
    await verify(Fundme.address, args);
  }
};

module.exports.tags = ["all", "hardhat"];
