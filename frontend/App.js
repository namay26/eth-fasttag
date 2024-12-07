import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Profile from "./components/Profile";

import { WagmiProvider, useReadContract } from "wagmi";
import { mainnet, polygon, arbitrum, baseSepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
  AppKitButton,
} from "@reown/appkit-wagmi-react-native";
import { base } from "viem/chains";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.reown.com
const projectId = "dcbf2a6e29a6a4d4c6244da31c308764";

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum, baseSepolia];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Page1} />
            <Tab.Screen name="Notifications" component={Page2} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
