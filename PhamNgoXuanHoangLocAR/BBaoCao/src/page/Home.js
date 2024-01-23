// Screen2.js
import React, { useState, useEffect } from 'react';
import detailProduct from './detailproduct';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './ProductListScreen';

// import StarRating from './path/to/StarRating';
const pageSize = 5; // Number of items per page

const Stack = createNativeStackNavigator();


export default function Home() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetail" component={detailProduct} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

