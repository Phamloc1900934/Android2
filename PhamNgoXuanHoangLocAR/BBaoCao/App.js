// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/Header';
// import Body from './src/Body';
import Footer from './src/Footer';
import { FunctionUpdateItem } from './src/page/itemProduct';
import Login from './src/Login';

export default function App() {
  const [activeScreen, setActiveScreen] = useState("screen1");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setScreen = (name) => {
    setActiveScreen(name);
  }

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setActiveScreen("home"); // Chuyển tới màn hình chính sau khi đăng nhập
    }
  }

  const [item, setitem] = useState('');
  return (
    <FunctionUpdateItem>
      {isLoggedIn ? (
        <View style={styles.container}>
          <Header />
          <Footer setScreen={setScreen} />
        </View>
      ) : (
        <View style={styles.container}>
          <Login onLogin={handleLogin} /> 
        </View>
      )}
    </FunctionUpdateItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});