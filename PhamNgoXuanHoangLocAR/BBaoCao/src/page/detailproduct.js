import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import StarRating from './StarRating';

export default function detailProduct({ route }) {
    const { product } = route.params;
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Placeholder functions for button actions
    const handleBuyNow = () => {
        // Implement your buy now action
    };

    const handleAddToCart = () => {
        // Implement your add to cart action
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Image source={{ uri: product.image }} style={styles.image} />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => setIsModalVisible(false)}
                >
                    <Image source={{ uri: product.image }} style={styles.fullSizeImage} />
                </TouchableOpacity>
            </Modal>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <StarRating styles={styles.starRatingContainer} rating={product.rating.rate} />
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleBuyNow} style={styles.buyButton}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddToCart} style={styles.cartButton}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ đục
    },
    fullSizeImage: {
        width: '90%', // Kích thước lớn của ảnh
        height: '70%',
        resizeMode: 'contain',
    },
    starRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'left',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    rating: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFA500', // Orange color for the rating
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    buyButton: {
        backgroundColor: '#4CAF50', // Green color for buy button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    cartButton: {
        backgroundColor: '#F44336', // Red color for add to cart button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // ...other styles if needed
});
