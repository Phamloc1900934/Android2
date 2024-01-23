import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const { username, password } = JSON.parse(userInfo);
        // Tự động đăng nhập
        login(username, password);
      }
    } catch (error) {
      console.log('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      const user = response.data.find(user => user.username === username && user.password === password);
      
      if (user) {
        await AsyncStorage.setItem('userInfo', JSON.stringify({ username, password }));
        onLogin(true); // Đăng nhập thành công
      } else {
        Alert.alert('Đăng nhập thất bại', 'Username hoặc Password không đúng');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi kết nối với server');
    }
  };

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Ẩn mật khẩu
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
