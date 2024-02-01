const { ethers, getNamedAccounts, deployments } = require("hardhat");

async function Fund() {
  const deployer = (await getNamedAccounts()).deployer;
  const MyContract = await deployments.get("FundMe");
  const fundme = await ethers.getContractAt(MyContract.abi, MyContract.address);
  const sendvalue = ethers.parseEther("1");

  console.log(`Funding..........`);
  const TransactionResponse = await fundme.fund({ value: sendvalue });
  await TransactionResponse.wait(1);
  console.log(`Contract Funded :)`);
}

Fund()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
