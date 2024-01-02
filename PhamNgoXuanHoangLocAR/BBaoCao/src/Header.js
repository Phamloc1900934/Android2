import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 10, // Adjust this value as needed to move the title down
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default Header;
