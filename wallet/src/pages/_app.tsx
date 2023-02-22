import type {AppProps} from 'next/app'

import {WagmiConfig, createClient, configureChains, goerli} from "wagmi";
import {publicProvider} from "wagmi/providers/public";
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {useEffect, useState} from "react";

const {chains, provider, webSocketProvider} = configureChains(
  [goerli],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({chains})
  ],
  provider,
  webSocketProvider,
});

export default function App({Component, pageProps}: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig client={client}>
      {mounted && <Component {...pageProps} />}
    </WagmiConfig>
  );
}
