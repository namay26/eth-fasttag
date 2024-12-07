import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Install if not already added

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

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.main_container}>
        <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = 
          options.tabBarLabel !== undefined 
            ? options.tabBarLabel 
            : options.title !== undefined 
            ? options.title 
            : route.name;

        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Search') {
          iconName = 'search-outline';
        } else if (route.name === 'Notifications') {
          iconName = 'notifications-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.iconContainer}
          >
            <Ionicons
              name={iconName}
              size={20}
              color={isFocused ? 'white' : 'grey'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
};

const App = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props}  />}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
        <Tab.Screen name="Search" component={Page1} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
        <Tab.Screen name="Notifications" component={Page2}  options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
      </Tab.Navigator>
    </NavigationContainer>
    <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const styles = StyleSheet.create({
  main_container: {
    marginLeft:20.425,
    marginRight:20.425,
    alignItems: 'center',
    backgroundColor: '',
   
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 130,
    width:352.15,
    borderRadius: 15,
     // Adjust as needed
  },
  iconContainer: {
    marginBottom: 40,
    width: 64.517, // Size of the square
    height: 64.517, // Size of the square
    backgroundColor: '#191919', // Square color
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Space between squares
    borderRadius: 10, // Optional for rounded corners
},

});

export default App;