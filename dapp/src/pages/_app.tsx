// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { version } from '@walletconnect/auth-client/package.json';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p>WalletConnect Auth v{version}</p>
      <Component {...pageProps} />
    </>
  );
}
