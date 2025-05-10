import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(email: string, password: string) {
    const response = await api.post('/auth/login', {
        email,
        password,
    });

    const { access_token } = response.data;

    await AsyncStorage.setItem('token', access_token);
    await AsyncStorage.setItem('lastEmail', email);


    return { email };
}
