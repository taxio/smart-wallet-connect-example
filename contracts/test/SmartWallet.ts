import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe("SmartWallet", () => {
  async function deploySmartWalletFixture() {
    const [owner, other] = await ethers.getSigners();

    const SmartWallet = await ethers.getContractFactory("SmartWallet");
    const smartWallet = await SmartWallet.deploy();

    return {SmartWallet, smartWallet, owner, other};
  }

  describe("Deployment", () => {
    it("ownable", async () => {
      const {smartWallet, owner} = await loadFixture(deploySmartWalletFixture);

      expect(await smartWallet.owner()).to.equal(owner.address);
    });
  });

  describe("isValidSignature", () => {
    it("return MagicValue when valid signature", async () => {
      const {smartWallet, owner} = await loadFixture(deploySmartWalletFixture);

      const message = "hello";
      const hashMessage = ethers.utils.hashMessage(message);
      const signature = await owner.signMessage(message);

      expect(await smartWallet.isValidSignature(hashMessage, signature)).to.equal("0x1626ba7e");
    });

    it("return 0xffffffff when invalid signature", async () => {
      const {smartWallet, other} = await loadFixture(deploySmartWalletFixture);

      const message = "hello";
      const hashMessage = ethers.utils.hashMessage(message);
      const signature = await other.signMessage(message);

      expect(await smartWallet.isValidSignature(hashMessage, signature)).to.equal("0xffffffff");
    });
  });
});
