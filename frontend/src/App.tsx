import React from 'react';

import {Web3Button, Web3Modal, Web3NetworkSwitch} from '@web3modal/react';
import {EthereumClient, modalConnectors, walletConnectProvider} from '@web3modal/ethereum';
import {configureChains, createClient, WagmiConfig, useAccount, useSignMessage} from 'wagmi'
import {goerli, polygonMumbai} from 'wagmi/chains'
import {ethers} from "ethers";
import {SmartWallet__factory} from "./typechain-types";

if (!process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_WALLET_CONNECT_PROJECT_ID env variable')
}

if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
  throw new Error('You need to provide REACT_APP_ALCHEMY_API_KEY env variable')
}

const walletConnectProjectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

const chains = [goerli, polygonMumbai];
const {provider} = configureChains(chains, [walletConnectProvider({projectId: walletConnectProjectId})]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

const ConnectorWrapper = () => {
  const {isConnected} = useAccount();
  const [smartWalletAddress, setSmartWalletAddress] = React.useState<string>('');
  const [verifyMessage, setVerifyMessage] = React.useState<string>('');
  const {error, isLoading, signMessage} = useSignMessage({
    onSuccess: async (signature, args) => {
      const hashMessage = ethers.utils.hashMessage(args.message)
      console.log('signature', signature);
      console.log('hashMessage', hashMessage);
      const walletContract = SmartWallet__factory.connect(smartWalletAddress, new ethers.providers.AlchemyProvider("goerli", alchemyApiKey));
      const res = await walletContract.isValidSignature(hashMessage, signature);
      console.log('isValidateSignature = ', res);
      switch (res) {
        case "0x1626ba7e":
          setVerifyMessage(`Valid! You are contract owner of ${smartWalletAddress}`);
          break;
        case "0xffffffff":
          setVerifyMessage(`Invalid:( You are not contract owner of ${smartWalletAddress}`);
          break;
        default:
          throw new Error(`Unknown response: ${res}`);
      }
    },
  });

  const generateSomeMessage = (): string => {
    return "Example";
  }

  return (
    <>
      <Web3Button/>

      <Web3NetworkSwitch/>

      <Web3Modal
        ethereumClient={ethereumClient}
        walletImages={{
          metaMask: '/images/wallet_metamask.webp',
        }}
        // Custom Chain Images
        chainImages={{
          5: '/images/chain_ethereum.webp',
          80001: 'images/chain_polygon.webp',
        }}
      />

      {isConnected && <div>
          <label htmlFor="smart-wallet-address">Smart Wallet Address: </label>
          <input id="smart-wallet-address" name="smart-wallet-address" placeholder="0x..."
                 onChange={(e) => setSmartWalletAddress(e.target.value)}/>
          <button disabled={isLoading} onClick={(event) => {
            event.preventDefault()
            signMessage({message: generateSomeMessage()})
          }}>
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        {error && <div>{error.message}</div>}
        {verifyMessage && <p>{verifyMessage}</p>}
      </div>}
    </>
  );
};

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <p>Smart Wallet Connect Example</p>
      <ConnectorWrapper/>
    </WagmiConfig>
  );
}

export default App;
