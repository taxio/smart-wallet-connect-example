import AuthClient, {generateNonce} from "@walletconnect/auth-client";
import {NextPage} from "next";
import {useCallback, useEffect, useState} from "react";

const Home: NextPage = () => {
  const [client, setClient] = useState<AuthClient | null>();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [uri, setUri] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const onClickAuth = useCallback(() => {
    if (!client) return;
    client.request({
      aud: window.location.href,
      domain: window.location.hostname.split(".").slice(-2).join("."),
      chainId: "eip155:1",
      type: "eip4361",
      nonce: generateNonce(),
      statement: "Sign in with wallet."
    })
      .then(({uri}) => setUri(uri || ""));
  }, [client, setUri]);

  // AuthClient の初期化
  useEffect(() => {
    AuthClient.init({
      relayUrl: process.env.NEXT_PUBLIC_RELAY_URL || "wss://relay.walletconnect.com",
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      metadata: {
        name: "Example Dapp for connecting Contract Wallet",
        description: "An example dapp for connecting Contract Wallet",
        url: window.location.host,
        icons: []
      }
    }).then((authClient) => {
      setClient(authClient);
      setHasInitialized(true);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!client) return;

    client.on("auth_response", ({params}) => {
      if ("code" in params) {
        console.error(params);
        return;
      }
      if ("error" in params) {
        console.error(params.error);
        return;
      }
      setAddress(params.result.p.iss.split(":")[4]);
    });
  }, [client]);

  return (
    <>
      {hasInitialized ? <>
        <p>Wallet address: {address || "Not connected"}</p>
        <button onClick={onClickAuth}>auth</button>
        <p>Auth URI: {uri}</p>
        <button onClick={() => navigator.clipboard.writeText(uri)}>Copy to clipboard</button>
      </> : <p>Initializing...</p>}
    </>
  )
};

export default Home;
