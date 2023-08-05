import AppLayout from "@/components/4_layouts/AppLayout";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { zkSyncTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { theme } from "@/theme/theme";
import { useEffect, useState } from "react";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;

const { chains, publicClient } = configureChains(
  [zkSyncTestnet],
  [
    infuraProvider({ apiKey: infuraKey }),
    alchemyProvider({ apiKey: alchemyKey }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "WEB3",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#03ffe0",
            accentColorForeground: "black",
          })}
        >
          <ChakraProvider theme={theme}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
}
