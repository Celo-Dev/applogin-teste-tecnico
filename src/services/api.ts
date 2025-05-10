import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Credenciais para login
// {
//   "email": "john@mail.com",
//   "password": "changeme"
// }

const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn('Token inválido ou expirado');
        }
        return Promise.reject(error);
    }
);

export default api;
