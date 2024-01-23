import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/Header';
import Footer from './src/Footer';
import { FunctionUpdateItem } from './src/page/itemProduct';
import Login from './src/Login';

export default function App() {
  const [activeScreen, setActiveScreen] = useState("screen1");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setActiveScreen("login"); // Đảm bảo bạn có màn hình đăng nhập được định nghĩa trong app của bạn
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve login status");
      }
    };

    checkLoginStatus();
  }, []);

  const setScreen = (name) => {
    setActiveScreen(name);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setActiveScreen("home"); // Chuyển tới màn hình chính sau khi đăng nhập
    }
  };

  return (
    <FunctionUpdateItem>
      {isLoggedIn ? (
        <View style={styles.container}>
          <Header />
          {/* Đảm bảo bạn có logic để chọn màn hình dựa trên activeScreen */}
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
