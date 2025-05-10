import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/login/LoginScreen';
import HomeScreen from '../features/home/HomeScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <Stack.Screen name="Home" component={HomeScreen} />
            )}
        </Stack.Navigator>
    );
}
