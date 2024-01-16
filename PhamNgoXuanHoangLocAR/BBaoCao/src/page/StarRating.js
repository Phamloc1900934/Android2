import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating,styles }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 > 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <View style={styles}>
            {Array(fullStars).fill().map((_, index) => (
                <Icon key={`full-${index}`} name="star" color="#FFD700" size={20} />
            ))}
            {halfStars > 0 && <Icon key={`half-star`} name="star-half" color="#FFD700" size={20} />}
            {Array(emptyStars).fill().map((_, index) => (
                <Icon key={`empty-${index}`} name="star-o" color="#FFD700" size={20} />
            ))}
        </View>
    );
};

export default StarRating;
