import { expect } from "chai";
import { Signer, TypedDataEncoder } from "ethers";
import { ethers } from "hardhat";
import {
  ChainlinkAccount__factory,
  ERC1967Proxy__factory,
  EntryPoint,
  Entry__factory,
} from "../typechain-types";
import { $ChainlinkAccountFactory } from "../typechain-types/contracts-exposed/ChainlinkAccountFactory.sol/$ChainlinkAccountFactory";
import { $ChainlinkAccount__factory } from "../typechain-types/factories/contracts-exposed/ChainlinkAccount.sol/$ChainlinkAccount__factory";
import { $ChainlinkAccountFactory__factory } from "../typechain-types/factories/contracts-exposed/ChainlinkAccountFactory.sol/$ChainlinkAccountFactory__factory";
import { makeUserOpBuilder, makeSignOp, UserOp, DEFAULT_SALT } from "./utils";

describe.only("ChainlinkAccount", () => {
  let chainId: bigint;
  let entryPoint: EntryPoint;
  let factory: $ChainlinkAccountFactory;
  let owner: Signer;
  let user: Signer;
  let stranger: Signer;
  let relay: Signer;

  let opBuilder: ReturnType<typeof makeUserOpBuilder>;
  let opSigner: ReturnType<typeof makeSignOp>;

  beforeEach(async () => {
    [owner, user, relay] = await ethers.getSigners().then((signers) => signers);
    stranger = new ethers.Wallet(ethers.keccak256(ethers.randomBytes(32)));
    ({ chainId } = await ethers.provider.getNetwork());
    entryPoint = await new Entry__factory(owner).deploy();
    factory = await new $ChainlinkAccountFactory__factory(owner).deploy(
      entryPoint.getAddress()
    );

    opBuilder = makeUserOpBuilder(entryPoint, factory, chainId);
    opSigner = makeSignOp(chainId);
  });

  describe("helper functions", async () => {
    it("helpers function should work as expected", async () => {
      const implementation = await new $ChainlinkAccount__factory(owner).deploy(
        entryPoint
      );
      const inter = new ethers.Interface([
        "function initialize(address owner) external",
      ]);
      const account = $ChainlinkAccount__factory.connect(
        await new ERC1967Proxy__factory(owner)
          .deploy(
            implementation,
            inter.encodeFunctionData("initialize", [await owner.getAddress()])
          )
          .then((contract) => contract.getAddress()),
        owner
      );

      const ownerAddress = await account.owner();
      expect(ownerAddress).to.be.equal(await owner.getAddress());

      await owner.sendTransaction({
        to: account,
        value: ethers.parseEther("1"),
      });

      const sampleOp = await opBuilder(
        {
          to: owner.getAddress(),
          value: ethers.parseEther("1"),
        },
        account,
        owner
      );

      expect(sampleOp.sender).to.be.equal(await account.getAddress());

      const encoder = TypedDataEncoder.from({ UserOp });
      expect(encoder.primaryType).to.be.equal("UserOp");
      expect(encoder.encode(sampleOp)).to.be.equal(
        await account.$_opEncodeData({ ...sampleOp, signature: "0x" })
      );

      const signedOp = await opSigner(account, sampleOp, owner);

      const validationResult = await account.$_validateSignature.staticCall(
        signedOp,
        ethers.encodeBytes32String("hello")
      );
      expect(Number(validationResult)).to.be.equal(0);
    });
  });

  it("should create an account", async () => {
    await factory.createAccount(user.getAddress(), DEFAULT_SALT);
    const account = await factory.getFunction("getAddress")(user, DEFAULT_SALT);
    const codelen = await ethers.provider
      .send("eth_getCode", [account, "latest"])
      .then((code) => code.length);

    expect(codelen).greaterThan(2);
  });

  it("should execute", async () => {
    const account = await factory
      .createAccount(user, DEFAULT_SALT)
      .then(() => factory.getFunction("getAddress")(user, DEFAULT_SALT))
      .then((address) => ChainlinkAccount__factory.connect(address, user));

    await owner.sendTransaction({
      to: account,
      value: ethers.parseEther("10"),
    });

    const balanceStrangerBefore = await ethers.provider.getBalance(stranger);

    const op = await opBuilder(
      {
        to: stranger.getAddress(),
        value: ethers.parseEther("1"),
      },
      account,
      owner
    );

    const signedOp = await opSigner(account, op, user);

    const tx = await entryPoint.handleOps([signedOp], owner);
    await tx.wait();

    const balanceStrangerAfter = await ethers.provider.getBalance(stranger);
    expect(balanceStrangerAfter - balanceStrangerBefore).to.be.equal(
      ethers.parseEther("1")
    );
  });
});
