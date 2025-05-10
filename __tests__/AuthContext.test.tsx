import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from '../src/context/AuthContext';
import { Text, Button } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    removeItem: jest.fn(),
}));

const TestComponent = () => {
    const { user, login, logout } = useAuth();

    return (
        <>
            <Text testID="user-email">{user?.email ?? 'Deslogado'}</Text>
            <Button title="Login" onPress={() => login({ email: 'john@maill.com' })} />
            <Button title="Logout" onPress={logout} />
        </>
    );
};

describe('AuthContext', () => {
    it('deve fazer login corretamente', async () => {
        const { getByText, getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(getByTestId('user-email').props.children).toBe('john@maill.com');
        });
    });

    it('deve fazer logout corretamente', async () => {
        const { getByText, getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText('Login'));
        fireEvent.press(getByText('Logout'));

        await waitFor(() => {
            expect(getByTestId('user-email').props.children).toBe('Deslogado');
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
        });
    });
});
