const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { Developement_Chain } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

Developement_Chain.includes(network.name)
  ? describe.skip
  : describe("Fundme Staging", async function () {
      let deployer;
      let fundme;
      let sendvalue = ethers.parseEther("0.04");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        const Mycontract = await deployments.get("FundMe");
        fundme = await ethers.Utils.getContractAt(
          Mycontract.abi,
          Mycontract.address
        );
      });

      describe("Withdraw", async function () {
        it("withdraw eth", async function () {
          await fundme.fund({ value: sendvalue });
          /*const Transactionresponse = await fundme.withdraw();
          await Transactionresponse.wait(1);
          const endingBalance = await ethers.provider.getBalance(fundme.target);
          assert.equal(endingBalance, 0);*/
          const Response = await fundme.getFunder(0);
          assert.equal(Response, process.env.PRIVATE_KEY);
        });
      });
    });
