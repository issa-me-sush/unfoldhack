import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider ,connectorsForWallets} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { OktoConnector } from '@okto_wallet/okto-connect-sdk';

import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
const projectId = "bbc302f89a722c69f043215565e5bf08"
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: 'RainbowKit App',
//   projectId,
//   chains,
// });
const oktoConnector = new OktoConnector({
  chains,
  options: {
    projectId: "bbc302f89a722c69f043215565e5bf08",
  },
});
const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});
const connectors = connectorsForWallets([
  
  ...wallets,
  {
    groupName: "Okto",
    wallets: [
   
      
     
    ],
  },

]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
