/*
const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Fundme", async function () {
  let fundme;
  let MockV3;
  let deployer;
  let sendvalue = ethers.parseEther("1"); // or 1000000000000000000  1 Eth
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer; //const { deployer } = await getNamedAccounts();
    const response = await deployments.fixture(["all"]);
    /*fundme = await ethers.getContractAt("FundMe", deployer);
    MockV3 = await ethers.getContractAt("MockV3Aggregator", deployer);*/ /*
    const MyContract = await deployments.get("FundMe");
    fundme = await ethers.getContractAt(MyContract.abi, MyContract.address);

    const myMock = await deployments.get("MockV3Aggregator");
    MockV3 = await ethers.getContractAt(myMock.abi, myMock.address);
  });

  describe("Constructor", async function () {
    it("Should give correct s_getPriceFeed address", async function () {
      const s_getPriceFeed = await fundme.s_getPriceFeed();
      assert.equal(s_getPriceFeed, MockV3.target);
    });
  });
  describe("fund", async () => {
    it("Fails if enough eth is not sent", async () => {
      await expect(fundme.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });
    it("update the amount funded data structure", async () => {
      await fundme.fund({ value: sendvalue });
      const response = await fundme.getAddressToAmountFunded(deployer);
      assert.equal(response.toString(), sendvalue.toString());
    });
    it("Update funder array", async () => {
      await fundme.fund({ value: sendvalue });
      const response = await fundme.getFunder(0);
      assert.equal(response, deployer);
    });
  });
  describe("Withdraw", async () => {
    beforeEach(async () => {
      await fundme.fund({ value: sendvalue });
    });

    it("should reset mapping", async () => {
      await fundme.withdraw();
      const response = await fundme.getAddressToAmountFunded(deployer);
      const amount = 0;
      assert.equal(response, amount);
    });
    it("withraw eth to single funder", async () => {
      //arrange
      const startingFundMeBalance = await ethers.provider.getBalance(
        fundme.target
      );
      const startingDeployerBalance = await ethers.provider.getBalance(
        deployer
      );

      //act
      const transactionresponse = await fundme.withdraw();
      const transactionreciept = await transactionresponse.wait(1);
      const { gasPrice, gasUsed } = transactionreciept;
      const gasCost = gasPrice * gasUsed; // for BigNumber :  gasPrice.mul(gasUsed);

      const endingFundMeBalance = await ethers.provider.getBalance(
        fundme.target
      );
      const endingDeployerBalance = await ethers.provider.getBalance(deployer);

      //assert
      assert.equal(endingFundMeBalance, 0);
      assert.equal(
        (startingFundMeBalance + startingDeployerBalance).toString(), // For Bignumber  .add(startingDeployerBalance)
        (endingDeployerBalance + gasCost).toString()
      );
    });
    it("Withdraw eth with multiple accounts", async () => {
      //arrange
      const accounts = await ethers.getSigners();
      for (let i = 1; i < 6; i++) {
        const ConnectedAccount = await fundme.connect(accounts[i]);
        await ConnectedAccount.fund({ value: sendvalue });
      }
      const startingFundMeBalance = await ethers.provider.getBalance(
        fundme.target
      );
      const startingDeployerBalance = await ethers.provider.getBalance(
        deployer
      );
      //act
      const transactionresponse = await fundme.withdraw();
      const transactionreciept = await transactionresponse.wait(1);
      const { gasUsed, gasPrice } = transactionreciept;
      const gasCost = gasUsed * gasPrice;
      const endingFundMeBalance = await ethers.provider.getBalance(
        fundme.target
      );
      const endingDeployerBalance = await ethers.provider.getBalance(deployer);

      //Assert
      assert.equal(endingFundMeBalance, 0);
      assert.equal(
        (startingFundMeBalance + startingDeployerBalance).toString(), // For Bignumber  .add(startingDeployerBalance)
        (endingDeployerBalance + gasCost).toString()
      );
      // Make sure that getFunder are reset properly
      await expect(fundme.getFunder(0)).to.be.reverted;

      for (j = 1; j < 6; j++) {
        await assert.equal(
          await fundme.getAddressToAmountFunded(accounts[j].address),
          0
        );
      }
    });
  });
});
*/

const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { expect, assert } = require("chai");
const { Developement_Chain } = require("../../helper-hardhat-config.js");

!Developement_Chain.includes(network.name)
  ? describe.skip
  : describe("Fundme", async () => {
      let fundme;
      let MockV3;
      let deployer;
      const sendvalue = ethers.parseEther("1");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        /*fundme = await ethers.getContract("FundMe", deployer);
    MockV3 = await ethers.getContract("MockV3Aggregator", deployer);*/

        const MyContract = await deployments.get("FundMe");
        fundme = await ethers.getContractAt(MyContract.abi, MyContract.address);

        const mycontract = await deployments.get("MockV3Aggregator");
        MockV3 = await ethers.getContractAt(mycontract.abi, mycontract.address);
      });

      describe("Constructor", async () => {
        it("Should give correct getPriceFeed Address", async function () {
          const Response = await fundme.getPriceFeed();
          assert.equal(Response, MockV3.target);
        });
      });
      describe("Fund", async function () {
        it("Should revert when enough eth is not send", async function () {
          await expect(fundme.fund()).to.be.revertedWith(
            "You need to spend more ETH!"
          );
        });
        it("Should update the AmountFunded Mapping", async function () {
          await fundme.fund({ value: sendvalue });
          const Response = await fundme.getAddressToAmountFunded(deployer);
          assert.equal(Response.toString(), sendvalue.toString());
        });
        it("Should update Array", async function () {
          await fundme.fund({ value: sendvalue });
          const Response = await fundme.getFunder(0);
          assert.equal(Response, deployer);
        });
      });
      describe("Withdraw", async function () {
        beforeEach(async function () {
          await fundme.fund({ value: sendvalue });
        });
        it("should withdraw eth with single funder", async function () {
          const StartingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const StartingfunderBalance = await ethers.provider.getBalance(
            deployer
          );

          const transactionresponse = await fundme.withdraw();
          const transactionreciept = await transactionresponse.wait(1);
          const { gasUsed, gasPrice } = transactionreciept;
          const GasFee = gasUsed * gasPrice;

          const endingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const endingfunderBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingfundmeBalance, 0);
          assert.equal(
            (StartingfundmeBalance + StartingfunderBalance).toString(),
            (endingfunderBalance + GasFee).toString()
          );
        });
        it("Allows user to withdraw with multiple users", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 5; i++) {
            const ConnectedFundme = await fundme.connect(accounts[i]);
            await ConnectedFundme.fund({ value: sendvalue });
          }
          const StartingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const StartingfunderBalance = await ethers.provider.getBalance(
            deployer
          );
          const TransactionReponse = await fundme.withdraw();
          const TransactionReciept = await TransactionReponse.wait(1);
          const { gasPrice, gasUsed } = TransactionReciept;
          const gasFee = gasPrice * gasUsed;
          const endingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const endingfunderBalance = await ethers.provider.getBalance(
            deployer
          );
          assert.equal(endingfundmeBalance, 0);
          assert.equal(
            (StartingfundmeBalance + StartingfunderBalance).toString(),
            (endingfunderBalance + gasFee).toString()
          );
          await expect(fundme.getFunder(0)).to.be.reverted;

          for (let i = 1; i < 5; i++) {
            const Response = await fundme.getAddressToAmountFunded(
              accounts[i].address
            );
            assert.equal(Response, 0);
          }
        });
        it("Allows only owner to withdraw", async function () {
          const accounts = await ethers.getSigners();
          const Attacker = accounts[1];
          const AttackerConnectedContract = await fundme.connect(Attacker);
          await expect(
            AttackerConnectedContract.withdraw()
          ).to.be.revertedWithCustomError(fundme, "Fundme_NotOwner");
        });

        it("Cheaper withdraw with single user", async function () {
          const StartingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const StartingfunderBalance = await ethers.provider.getBalance(
            deployer
          );

          const transactionresponse = await fundme.CheaperWithdraw();
          const transactionreciept = await transactionresponse.wait(1);
          const { gasUsed, gasPrice } = transactionreciept;
          const GasFee = gasUsed * gasPrice;

          const endingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const endingfunderBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingfundmeBalance, 0);
          assert.equal(
            (StartingfundmeBalance + StartingfunderBalance).toString(),
            (endingfunderBalance + GasFee).toString()
          );
        });

        it("CheaperWithdraw test Multiple users", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 5; i++) {
            const ConnectedFundme = await fundme.connect(accounts[i]);
            await ConnectedFundme.fund({ value: sendvalue });
          }
          const StartingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const StartingfunderBalance = await ethers.provider.getBalance(
            deployer
          );
          const TransactionReponse = await fundme.CheaperWithdraw();
          const TransactionReciept = await TransactionReponse.wait(1);
          const { gasPrice, gasUsed } = TransactionReciept;
          const gasFee = gasPrice * gasUsed;
          const endingfundmeBalance = await ethers.provider.getBalance(
            fundme.target
          );
          const endingfunderBalance = await ethers.provider.getBalance(
            deployer
          );
          assert.equal(endingfundmeBalance, 0);
          assert.equal(
            (StartingfundmeBalance + StartingfunderBalance).toString(),
            (endingfunderBalance + gasFee).toString()
          );
          await expect(fundme.getFunder(0)).to.be.reverted;

          for (let i = 1; i < 5; i++) {
            const Response = await fundme.getAddressToAmountFunded(
              accounts[i].address
            );
            assert.equal(Response, 0);
          }
        });
      });
    });
