import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserInfo({ navigation }) {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        };

        getUserInfo();
    }, []);

    const onLogout = async () => {
        await AsyncStorage.removeItem('userInfo');
        // Thay vì tải lại ứng dụng, bạn quay trở lại màn hình đăng nhập
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>User Information</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Username:</Text>
                <Text style={styles.infoValue}>{userInfo.username || 'N/A'}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{userInfo.email || 'N/A'}</Text>
            </View>
            {/* Thêm các thông tin khác tương tự nếu cần */}
            <Pressable style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
        </ScrollView>
    )
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
