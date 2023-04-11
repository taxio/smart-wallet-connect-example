import React, {MouseEvent, useEffect, useState} from "react";
import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
import {ethers} from "ethers";

const core = new Core({
  projectId: process.env.PROJECT_ID,
});

const Home = () => {
  //@ts-ignore
  const [wallet, setWallet] = useState<Web3Wallet>();
  const [signer, setSigner] = useState();
  const [connectUri, setConnectUri] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const wallet = await Web3Wallet.init({
        core,
        metadata: {
          name: 'Demo app',
          description: 'Demo Client as Wallet/Peer',
          url: 'www.walletconnect.com',
          icons: []
        }
      });
      setWallet(wallet);

      const _signer = ethers.Wallet.createRandom();
      // @ts-ignore
      setSigner(_signer);

      // example dapp: https://react-app.walletconnect.com/
      wallet.on('session_proposal', async event => {
        console.log("session_proposal", JSON.stringify(event,null,2));
        const { params } = event;
        const {requiredNamespaces,proposer,id} = params;
        const _wallet = ethers.Wallet.createRandom();
        const address = _wallet.address;
        const namespaceTuples = Object.keys(requiredNamespaces)
          .map(key => [
              key, 
              {...requiredNamespaces[key],accounts:requiredNamespaces[key].chains?.map(chain=>chain+':'+address)}
          ]);
        const namespaces = Object.fromEntries(namespaceTuples);
        await wallet.approveSession({
          id,
          namespaces,
        });
      });

      // ここにあらゆる署名系リクエストが飛んでくる
      wallet.on("session_request", async event => {
        console.log("session_request", event);
      });

      // dapp がセッションを切った時に発火する。
      // wallet 側は保持している session uri を捨てる。
      wallet.on("session_delete", async event => {
        console.log("session_delete", event);
      })

      // example dapp: https://react-auth-dapp.walletconnect.com/
      wallet.on("auth_request", async event => {
        console.log("auth_request", event);

        // privKey生成
        const _wallet = ethers.Wallet.createRandom();
        // const privKey = _wallet.privateKey;
        const address = _wallet.address;
        
        // request 取り出す
        const {id, topic, params} = event;
        const {requester, cacaoPayload} = params;

        // iss 作る
        const iss = `did:pkh:eip155:5:${address}`;

        // sign する
        const message = wallet.formatMessage(cacaoPayload, iss);
        const signature = await _wallet.signMessage(message);

        console.log("signature", signature);

        await wallet.respondAuthRequest(
          {
            id: id,
            signature: {
              s: signature,
              t: "eip191"
            },
          },
          iss
        );
      });

      console.log('wallet', wallet);
    };
    init();
  }, []);

  const onConnect = async (e: MouseEvent) => {
    e.preventDefault();
    console.log('connectUri', connectUri);
    localStorage.setItem('connectUri', connectUri ?? "");
    await wallet.core.pairing.pair({ uri: connectUri });
  };

  return (
    <>
      <p>Web3 Wallet</p>
      <input value={connectUri} onChange={e => setConnectUri(e.target.value)}/>
      <button onClick={onConnect}>connect</button>
    </>
  );
}

export default Home;
