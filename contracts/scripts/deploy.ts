import { ethers } from "hardhat";

async function main() {
  const SmartWallet = await ethers.getContractFactory("SmartWallet");
  const smartWallet = await SmartWallet.deploy();

  await smartWallet.deployed();

  console.log(`SmartWallet deployed to ${smartWallet.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
