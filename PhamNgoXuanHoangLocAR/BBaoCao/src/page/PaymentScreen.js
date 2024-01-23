import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button } from 'react-native';
const PaymentScreen = ({ route }) => {
    const { cartItems } = route.params;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const savePaymentInfo = async () => {
            try {
                // Lưu thông tin giỏ hàng và thông tin người dùng vào AsyncStorage dưới key 'paymentInfo'
                await AsyncStorage.setItem('paymentInfo', JSON.stringify({ cartItems, userInfo }));
            } catch (error) {
                console.error('Error saving payment info:', error);
            }
        };

        if (userInfo && cartItems.length > 0) {
            savePaymentInfo();
        }
    }, [userInfo, cartItems]);

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


    const handleConfirmReceived = async () => {
        try {
            // Xóa thông tin thanh toán khỏi AsyncStorage
            await AsyncStorage.removeItem('paymentInfo');
            // Thêm bất kỳ hành động nào ở đây, ví dụ: thông báo hoặc chuyển hướng người dùng
            alert('Đã xác nhận nhận hàng!');
        } catch (error) {
            console.error('Error removing payment info:', error);
        }
    };


    return (
        <ScrollView style={styles.container}>
            {userInfo && (
                <View>
                    <Text style={styles.header}>Thông Tin Người Nhận</Text>
                    <Text>Họ và tên: {userInfo.name.firstname} {userInfo.name.lastname}</Text>
                    <Text>Email: {userInfo.email}</Text>
                    <Text>Địa chỉ: {userInfo.address.city}, {userInfo.address.street}, {userInfo.address.zipcode}</Text>
                    <Text>Số điện thoại: {userInfo.phone}</Text>
                </View>
            )}
            <Text style={styles.header}>Thông Tin Thanh Toán</Text>
            {cartItems.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Text>Tên sản phẩm: {item.title}</Text>
                    <Text>Giá: ${item.price}</Text>
                    <Text>Số lượng: {item.quantity}</Text>
                </View>
            ))}
            <Button title="Đã Nhận Hàng" onPress={handleConfirmReceived} />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    // Thêm styles khác nếu cần
});

export default PaymentScreen;
