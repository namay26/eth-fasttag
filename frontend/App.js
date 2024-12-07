import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Install if not already added

import Home from './components/Home';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Profile from './components/Profile';

const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props}  />}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
        <Tab.Screen name="Search" component={Page1} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
        <Tab.Screen name="Notifications" component={Page2}  options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  />
      </Tab.Navigator>
    </NavigationContainer>
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