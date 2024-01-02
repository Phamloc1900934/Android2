// Body.js
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Home from './page/Home';
import Setting from './page/Setting';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const Body = (activeScreen) => {
  useEffect(()=>{
    // console.log(activeScreen);
  },[activeScreen]);
  // console.log(activeScreen);
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Body;
