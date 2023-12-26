// Body.js
import React from 'react';
import { View, Text, StyleSheet,ScrollView,Image, Pressable } from 'react-native';

export default function Setting({ navigation }) {
    const onPressHandler = () => {
        navigation.navigate('screen2');
    }

    return (
        <View style={styles.body}>
           <Text> Hello Page setting </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    },
    slide: {
        width:'100%',
        
    }
})
