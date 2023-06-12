import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-exposed";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks";

const optimizedComilerSettings = {
  version: "0.8.18",
  settings: {
    optimizer: { enabled: true, runs: 10000 },
    viaIR: true,
  },
};
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: { enabled: true, runs: 1000000 },
        },
      },
    ],
    overrides: {
      "contracts/ChainlinkAccount.sol": optimizedComilerSettings,
    },
  },
  networks: {
    mumbai: {
      url: "https://summer-hardworking-crater.matic-testnet.discover.quiknode.pro/9846d57fb45e10c4c85ef6fd7dc48bd1d32febeb",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      mumbai: process.env.ETHERSCAN_API_KEY!,
      polygonMumbai: process.env.ETHERSCAN_API_KEY!,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  exposed: {
    include: ['**/*'],
    outDir:  'contracts-exposed',
    prefix:  '$',
  },
};

export default config;
