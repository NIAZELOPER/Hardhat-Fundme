const { ethers, deployments, getNamedAccounts } = require("hardhat");

async function Withdrawing() {
  const { deployer } = await getNamedAccounts();
  const MyContract = await deployments.get("FundMe");
  const fundme = await ethers.getContractAt(MyContract.abi, MyContract.address);
  const sendvalue = ethers.parseEther("1");

  const Transactionresponse = await fundme.fund({ value: sendvalue });
  await Transactionresponse.wait(1);
  console.log("Withdrawing........");
  console.log("---------------------------------------------------------");
  await fundme.withdraw();
  console.log("Amounts Withdrawn :)");
}

Withdrawing()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
