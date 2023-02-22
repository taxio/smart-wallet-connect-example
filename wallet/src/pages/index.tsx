import React, {MouseEvent, useEffect, useState} from "react";
import AuthClient from "@walletconnect/auth-client";
import {useConnect, useAccount, useDisconnect, useSignMessage, Address, useNetwork, Chain} from "wagmi";

type WalletConnectFormProps = {
  chain: Chain;
  eoaAddress: Address;
}

const WalletConnectForm: React.FC<WalletConnectFormProps> = props => {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [walletConnectUri, setWalletConnectUri] = useState<string>("");
  const [connecting, setConnecting] = useState<boolean>(false);
  const {signMessageAsync} = useSignMessage();

  const initializeAuthClient = async () => {
    const client = await AuthClient.init({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      relayUrl: process.env.NEXT_PUBLIC_RELAY_URL || "wss://relay.walletconnect.com",
      metadata: {
        name: "Contract Wallet connector",
        description: "An example wallet application for connecting Contract Wallet to Dapps using WalletConnect",
        url: 'https://walletconnect.com/',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    })
    setAuthClient(client);
  };

  useEffect(() => {
    try {
      (async () => {
        await initializeAuthClient();
      })()
    } catch (e) {
      alert(e);
    }
  }, []);

  const onConnect = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!authClient) return;

    setConnecting(true);

    authClient.on('auth_request', async ({id, params}) => {
      const iss = `did:pkh:eip155:${props.chain.id}:${contractAddress}`;
      const message = authClient.formatMessage(params.cacaoPayload, iss);
      const signature = await signMessageAsync({message});

      await authClient.respond(
        {
          id: id,
          signature: {
            s: signature,
            t: "eip1271",
          }
        },
        iss,
      );
    })

    try {
      await authClient.core.pairing.pair({uri: walletConnectUri});
    } catch (e) {
      alert(e);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <>
      <p>WalletConnect Form</p>
      <label>Contract Wallet Address </label>
      <input value={contractAddress} onChange={e => setContractAddress(e.target.value)}/>
      <br/>
      <label>WalletConnect URI </label>
      <input value={walletConnectUri} onChange={e => setWalletConnectUri(e.target.value)}/>
      <br/>
      <button onClick={onConnect} disabled={connecting}>
        connect
        {connecting && ' (connecting)'}
      </button>
    </>
  );
}
const Home = () => {
  const {address: eoaAddress, isConnected: eoaIsConnected} = useAccount();
  const {connect, connectors, isLoading, pendingConnector} = useConnect();
  const {chain} = useNetwork();
  const {disconnect} = useDisconnect();

  return (
    <>
      <p>Web3 Wallet</p>
      {eoaIsConnected ? <>
        <p>EOA Connected: {eoaAddress} ({chain?.name})</p>
        <button onClick={() => disconnect()}>Disconnect</button>
        <WalletConnectForm chain={chain!} eoaAddress={eoaAddress!}/>
      </> : <>
        <p>EOA Not Connected</p>
        {connectors.map(connector => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({connector})}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))}
      </>}
    </>
  );
}

export default Home;