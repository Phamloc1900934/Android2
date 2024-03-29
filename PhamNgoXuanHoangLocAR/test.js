import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PaymentScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchPaymentAndUserInfo = async () => {
            try {
                // Truy xuất thông tin thanh toán từ AsyncStorage
                const paymentInfoString = await AsyncStorage.getItem('paymentInfo');
                if (paymentInfoString) {
                    const paymentInfo = JSON.parse(paymentInfoString);
                    setUserInfo(paymentInfo.userInfo);
                    setCartItems(paymentInfo.cartItems || []);
                } else {
                    console.log('No payment info found');
                }
            } catch (error) {
                console.error('Error fetching payment and user info:', error);
            }
        };

        fetchPaymentAndUserInfo();
    }, []);

    const handleConfirmReceived = async () => {
        try {
            await AsyncStorage.removeItem('paymentInfo');
            alert('Đã xác nhận nhận hàng!');
            // Sau khi xác nhận, bạn có thể chuyển hướng người dùng hoặc cập nhật UI
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
    // Các styles khác nếu cần
});

export default PaymentScreen;
