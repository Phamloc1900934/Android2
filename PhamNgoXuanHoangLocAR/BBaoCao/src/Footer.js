import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './Login';
import Home from './page/Home';
import Setting from './page/Setting';
import Cart from './page/Cart';
import PaymentScreen from './page/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
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
              iconName = 'wrench';
            } else if (route.name === 'Cart') {
              iconName = 'cart-plus';
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
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Setting" component={Setting} />
        <Tab.Screen name="PaymentScreen" component={PaymentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Footer;
