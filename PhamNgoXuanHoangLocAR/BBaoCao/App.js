// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/Header';
import Body from './src/Body';
import Footer from './src/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState("screen1");
  const setScreen = (name) => {
    setActiveScreen(name);
  }
  return (
    <View style={styles.container}>
      <Header title="My App" />
      <Body activeScreen={activeScreen} />
      <Footer setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});