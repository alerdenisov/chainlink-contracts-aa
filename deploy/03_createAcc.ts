import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ChainlinkAccountFactory__factory } from "../typechain-types";

const func: DeployFunction = async function ({
  deployments: { deploy, get },
  getNamedAccounts,
  getUnnamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  const entryDeployment = await get("Entry");
  const factoryDeployment = await get("ChainlinkAccountFactory");
  const factory = ChainlinkAccountFactory__factory.connect(
    factoryDeployment.address,
    await ethers.getSigner(deployer)
  );

  console.log("Deployer is ", deployer);
  const account = await factory.getFunction("getAddress")(deployer, 5);
  console.log("Account is ", account);
  const codelen = await ethers.provider
    .getCode(account)
    .then((code) => code.length);
  if (codelen <= 2) {
    await factory.createAccount(deployer, 5).then((tx) => tx.wait());
  }

  const accountBalance = await ethers.provider.getBalance(account);
  if (accountBalance < ethers.parseEther("1")) {
    const signer = await ethers.getSigner(deployer);
    await signer.sendTransaction({
      to: account,
      value: ethers.parseEther("1") - accountBalance,
    });
  }

  // console.log("entry: ", entryDeployment.address);
  // console.log("factory: ", factoryDeployment.address);
  // console.log("account: ", account);

  // const [first] = await ethers.getSigners();
  // console.log(
  //   await factory
  //     .connect(first)
  //     .createAccount(first.address, 5)
  //     .then((tx) => tx.wait())
  // );
  // //   await deploy("ChainlinkAccountFactory", {
  // //     from: deployer,
  // //     args: [entry.address],
  // //     deterministicDeployment: true
  // //   });
};
export default func;
