// Screen2.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import detailProduct from './detailproduct';
import { useNavigation, NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StarRating from './StarRating';
// import StarRating from './path/to/StarRating';
const pageSize = 5; // Number of items per page

const Stack = createNativeStackNavigator();

const ProductListScreen = ({ navigation }) => {
    // product
    const [productData, setProductData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // category 
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const navigateToDetailProduct = (navigation, item) => {
        navigation.navigate('Chi tiết sản phẩm', { product: item });
      };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get('https://fakestoreapi.com/products/categories');
                setCategories(['All', ...categoryResponse.data]);
            } catch (error) {
                alert('Error fetching categories: ' + error.message);
            }
        };

        const fetchProducts = async () => {
            try {
                const productUrl = selectedCategory === 'All'
                    ? 'https://fakestoreapi.com/products'
                    : `https://fakestoreapi.com/products/category/${selectedCategory}`;
                const response = await axios.get(productUrl);
                setProductData(response.data);
                setDisplayData(response.data.slice(0, pageSize));
            } catch (error) {
                alert('Error fetching products: ' + error.message);
            }
        };

        fetchCategories();
        fetchProducts();
    }, [selectedCategory]);

    const loadMore = () => {
        if ((page * pageSize) >= productData.length) {
            setHasMore(false);
            return;
        }
        const nextPage = page + 1;
        const nextItems = productData.slice(0, nextPage * pageSize);
        setDisplayData(nextItems);
        setPage(nextPage);
    };

    const truncateDescription = (description) => {
        return description.split(' ').slice(0, 10).join(' ') + '...';
    };

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        setPage(1);
        setHasMore(true);
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={() => navigateToDetailProduct(navigation, item)}
        >
            <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <Text style={styles.saleLabel}>Sale: {item.id}%</Text>
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.titleText}>Title: {item.title}</Text>
                    <Text style={styles.priceText}>Price: {item.price}</Text>
                    <Text style={styles.descriptionText}>
                        Description: {truncateDescription(item.description)}
                    </Text>
                    <StarRating styles = {{ flexDirection: 'row' }} rating={item.rating.rate} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.body}>
            <Text style={styles.text}>Product Catalog</Text>
            <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonSelected]}
                        onPress={() => filterByCategory(category)}
                    >
                        <Text style={styles.categoryButtonText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={displayData}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    if (!hasMore) {
                        return <Text>No more products.</Text>;
                    }
                    return null;
                }}
            />
        </View>
    );
};

export default function Home() {
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chi tiết sản phẩm" component={detailProduct} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    categoryButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#ddd',
    },
    categoryButtonSelected: {
        backgroundColor: '#007bff',
    },
    categoryButtonText: {
        color: 'white',
    }, body: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
    },
    imageContainer: {
        width: '50%',
        padding: 10,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    productDetails: {
        width: '50%',
        padding: 10,
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
    descriptionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
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
    },
    // ...other styles...
});
