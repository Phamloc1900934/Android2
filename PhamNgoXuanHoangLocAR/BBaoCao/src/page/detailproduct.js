
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function detailProduct({ route }) {
    const { product } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{product.title}</Text>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    price: {
        fontSize: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
});
