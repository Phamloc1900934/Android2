import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { itemProduct } from './page/itemProduct';
// Header Component với SearchBar
const Header = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  
  const updateSearch = (query) => {
    setSearch(query);
    onSearch(query);
  };

  return (
    <View style={styles.header}>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
    </View>
  );
};

const ProductsScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  const { updateItem } = useContext(itemProduct);

  const handleClick = (itemm) => {
    updateItem(itemm)
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    if (query.trim()) {
      // Chỉ lọc sản phẩm khi có từ khóa nhập vào
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <View >
      <Header onSearch={handleSearch} />
      {search.trim() ? (
        // Chỉ hiển thị FlatList khi có từ khóa
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleClick(item)}
            >
              <View style={styles.productItem}>
                <Text style={styles.productTitle}>{item.title}</Text>
                {/* Các thông tin sản phẩm khác */}
              </View>
            </TouchableOpacity>
          )}
          style={styles.list} // Điều chỉnh kích thước của FlatList nếu cần
          ListEmptyComponent={<Text style={styles.noResults}>Not found...</Text>} // Thông báo khi không có kết quả
        />
      ) : null}
    </View>
  );
};

// export default function Home() {
//     return (
//         <NavigationContainer independent={true}>
//           <Stack.Navigator>
//             <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="Chi tiết sản phẩm" component={detailProduct} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       );
// }
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
  },
  searchBarInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productTitle: {
    fontWeight: 'bold',
  }, list: {
    // Nếu bạn muốn giới hạn kích thước của danh sách, bạn có thể thêm
    maxHeight: '60%', // Giới hạn chiều cao tối đa của FlatList
  },
  noResults: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default ProductsScreen;
