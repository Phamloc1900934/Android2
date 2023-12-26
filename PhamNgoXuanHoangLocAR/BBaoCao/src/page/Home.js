// Screen2.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Home({ }) {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProductData(response.data);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.body}>
            <Text style={styles.text}>Product Catalog</Text>

            <ScrollView style={styles.dataContainer}>
                {productData.map((product) => (
                    <TouchableOpacity 
                        key={product.id} 
                        style={styles.productContainer}
                    >
                        <Text style={styles.dataText}>Title: {product.title}</Text>
                        <Text style={styles.dataText}>Price: {product.price}</Text>
                        <Text style={styles.dataText}>Description: {product.description}</Text>
                        <Text style={styles.dataText}>Category: {product.category}</Text>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <Text style={styles.dataText}>
                            Rating: {product.rating.rate} ({product.rating.count} reviews)
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataContainer: {
        width: '100%',
    },
    productContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    dataText: {
        fontSize: 16,
        marginBottom: 5,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    // ... other styles you might need
});