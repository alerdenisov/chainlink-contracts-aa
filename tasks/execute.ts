import { task } from "hardhat/config";
import { ChainlinkAccount__factory } from "../typechain-types";

task("execute")
  .addParam("account", "The account to execute from")
  .addParam("to", "The destination address")
  .addParam("value", "The value to send")
  .addParam("data", "The data to send")
  .setAction(async (taskArgs, hre) => {
    const account = taskArgs.account;
    const to = hre.ethers.resolveAddress(taskArgs.to as string);
    const value = hre.ethers.parseEther(taskArgs.value as string);
    const data = hre.ethers.hexlify(taskArgs.data as string);

    const accounts = await hre.ethers.getSigners();
    const accountContract = await ChainlinkAccount__factory.connect(
      account,
      hre.ethers.provider
    );
    const ownerAddress = await accountContract.owner();
    const signer = accounts.find((acc) => acc.address === ownerAddress);
    const tx = await accountContract.connect(signer).execute(to, value, data);

    console.log(tx);
  });
