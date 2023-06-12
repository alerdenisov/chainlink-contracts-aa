import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function ({
  deployments: { deploy, get },
  getNamedAccounts,
  getUnnamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  const entry = await get("Entry");


  const deployment = await deploy("ChainlinkAccountFactory", {
    from: deployer,
    args: [entry.address],
    deterministicDeployment: true
  });

  console.log('ChainlinkAccountFactory deployed to:', deployment.address);
};
export default func;
