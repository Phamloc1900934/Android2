// addToCart.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const addToCart = async (product) => {
    try {
        const cartData = await AsyncStorage.getItem('cartItems');
        let cart = cartData ? JSON.parse(cartData) : [];
        const productIndex = cart.findIndex((item) => item.id === product.id);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            const newProduct = { ...product, quantity: 1 };
            cart.push(newProduct);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(cart));
        alert('Add product to card success');
    } catch (error) {
        console.error('Cant add product to card', error);
    }
};

export default addToCart;
