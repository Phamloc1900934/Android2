import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; // Your Home screen
import detailProduct from './detailproduct';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="detailProduct" component={detailProduct} />
        </Stack.Navigator>
    );
}
