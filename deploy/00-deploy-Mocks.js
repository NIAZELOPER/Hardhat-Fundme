const {
  DECIMALS,
  INITIAL_ANSWER,
  Developement_Chain,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const ChainId = network.config.chainId;

  if (Developement_Chain.includes(network.name) /* OR  ChainId == 31337 */) {
    log("Local network detected..... Deploying mocks!");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("Mocks Deployed");
    log(
      `---------------------------------------------------------------------`
    );
  }
};
module.exports.tags = ["all", "mocks"];
