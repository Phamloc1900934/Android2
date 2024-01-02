import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './page/Home';
import Setting from './page/Setting';
import Page1 from './page/page1';
import Page2 from './page/page2';
const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Setting') {
              iconName = 'cog';
            } else if (route.name === 'Page1') {
              iconName = 'plus';
            } else if (route.name === 'Page2') {
              iconName = 'plus';
            }
            return <FontAwesome5 name={iconName} size={focused ? 25 : 20} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#f0f',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: true,
          labelStyle: { fontSize: 14 },
          showIcon: true,
        }}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Page1" component={Page1} />
        <Tab.Screen name="Page2" component={Page2} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Footer;
