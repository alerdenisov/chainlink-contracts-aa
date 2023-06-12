import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function ({
  deployments: { deploy, get },
  getNamedAccounts,
  getUnnamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  const deployment = await deploy("Entry", {
    from: deployer,
    args: [],
    deterministicDeployment: true
  });

  console.log('Entry deployed to:', deployment.address);
};
export default func;
