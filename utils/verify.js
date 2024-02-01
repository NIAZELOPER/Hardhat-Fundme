const { run } = require("hardhat");

const verify = async (ContractAddr, Arg) => {
  try {
    await run("verify:verify", {
      address: ContractAddr,
      constructorArguments: Arg,
    });
  } catch (e) {
    if (e.message.toString().includes("already verified")) {
      console.log(`Already verified`);
    }
  }
};

module.exports = { verify };
