import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import StarRating from './StarRating';

// Sample cart items
const cartItems = [
    // Add more products as needed
];

export default function Cart({ navigation }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        try {
            const cartData = await AsyncStorage.getItem('cartItems');
            if (cartData !== null) {
                setItems(JSON.parse(cartData));
            }
        } catch (error) {
            console.log('Error loading cart items', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCartItems();
        }, [])
    );

    const onRemoveItem = async (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);

        try {
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
        } catch (error) {
            console.log('Error removing item from cart', error);
        }
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const discountPrice = item.price - (item.price * (item.id || 0) / 100);
            return total + (discountPrice * item.quantity);
        }, 0);
    };

    const totalPrice = getTotalPrice();

    const decreaseQuantity = async (id) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
            }
            return item;
        });
        setItems(updatedItems);

        try {
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
        } catch (error) {
            console.log('Error updating item quantity', error);
        }
    };

    const increaseQuantity = async (id) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setItems(updatedItems);

        try {
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
        } catch (error) {
            console.log('Error updating item quantity', error);
        }
    };

    const truncateDescription = (description) => {
        return description.split(' ').slice(0, 10).join(' ') + '...';
    };

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.header}>Your Cart</Text>
                <FlatList
                    data={items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        const salePercentage = item.id || 0; // Giả sử mỗi sản phẩm có trường salePercentage
                        const discountPrice = item.price - (item.price * salePercentage / 100);

                        return (
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <Text style={styles.saleLabel}>Sale: {item.id}%</Text>

                                <View style={styles.itemInfo}>
                                    <Text style={styles.titleText}>Title: {item.title}</Text>
                                    <Text style={styles.priceText}>Price: {item.price}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityChangeButton}>
                                            <Text style={styles.quantityChangeButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.originalPriceText}>Original Price: ${item.price.toFixed(2)}</Text>
                                        <Text style={styles.discountPriceText}>Sale Price: ${discountPrice.toFixed(2)}</Text>
                                        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityChangeButton}>
                                            <Text style={styles.quantityChangeButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.descriptionText}>
                                        Description: {truncateDescription(item.description)}
                                    </Text>
                                    <StarRating styles={{ flexDirection: 'row' }} rating={item.rating.rate} />
                                    {/* <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeButton}>
                                        <Text style={styles.removeButtonText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f0f0f5',
    },
    scrollViewContainer: {
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // for Android
        padding: 10,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        color: '#007bff',
        marginBottom: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', // Đảm bảo rằng container chiếm đủ không gian
    },
    quantityText: {
        fontSize: 14,
        color: '#666',
    },
    quantityButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 15, // Làm tròn nút
        alignItems: 'center',
        justifyContent: 'center',
        width: 30, // Đặt kích thước cố định cho nút
        height: 30,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, // chỉ hoạt động trên Android
    },
    quantityButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    saleLabel: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
    }, quantityChangeButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },

    quantityChangeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }, originalPriceText: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    discountPriceText: {
        fontWeight: 'bold',
        color: '#E53935',
    },
});
