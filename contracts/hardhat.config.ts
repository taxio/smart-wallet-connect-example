import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCEHEMY_API_KEY = process.env.ALCEHEMY_API_KEY!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCEHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: true,
    token: "ETH",
    currency: "JPY",
    gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: COIN_MARKET_CAP_API_KEY
  }
};

export default config;
