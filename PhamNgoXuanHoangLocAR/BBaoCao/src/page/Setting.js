import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function UserInfo({ navigation }) {
    const [userInfo, setUserInfo] = useState(null); // Sử dụng null để dễ dàng kiểm tra trạng thái ban đầu

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const storedCredentials = await AsyncStorage.getItem('userInfo');
                const { username, password } = storedCredentials ? JSON.parse(storedCredentials) : {};

                if (!username || !password) {
                    console.log('No login info found');
                    return;
                }

                const response = await axios.get('https://fakestoreapi.com/users');
                const userMatch = response.data.find(user => user.username === username && user.password === password);

                if (userMatch) {
                    // Loại bỏ password và username từ thông tin được hiển thị
                    const { password, username, ...restUserInfo } = userMatch;
                    setUserInfo(restUserInfo);
                } else {
                    console.log('No matching user found');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const onLogout = async () => {
        await AsyncStorage.removeItem('userInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    if (!userInfo) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>User Information</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Full Name:</Text>
                <Text style={styles.infoValue}>{userInfo.name.firstname} {userInfo.name.lastname}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>City:</Text>
                <Text style={styles.infoValue}>{userInfo.address.city}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Street:</Text>
                <Text style={styles.infoValue}>{userInfo.address.street}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Zipcode:</Text>
                <Text style={styles.infoValue}>{userInfo.address.zipcode}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
            {/* Bạn có thể thêm nhiều thông tin khác ở đây dựa trên dữ liệu của userInfo */}
            <Pressable style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoItem: {
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 16,
        marginLeft: 5,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
    },
});
