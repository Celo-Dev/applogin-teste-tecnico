import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/features/home/HomeScreen';

const mockLogout = jest.fn();

jest.mock('../src/context/AuthContext', () => ({
    useAuth: () => ({
        user: { email: 'john@email.com' },
        logout: mockLogout,
    }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    removeItem: jest.fn(),
}));

jest.mock('../src/modules/DeviceInfoModule', () => ({
    getSystemVersion: jest.fn(() => Promise.resolve('12')),
    getDeviceManufacturer: jest.fn(() => Promise.resolve('Google')),
}));

jest.mock('native-base', () => {
    const originalModule = jest.requireActual('native-base');
    return {
        ...originalModule,
        useToast: () => ({ show: jest.fn() }),
    };
});

describe('HomeScreen', () => {
    it('deve exibir o nome extraído do e-mail do usuário', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('John')).toBeTruthy();
    });

    it('deve buscar e mostrar versão do sistema e fabricante', async () => {
        const { getByText } = render(<HomeScreen />);
        await waitFor(() => {
            expect(getByText('12')).toBeTruthy();
            expect(getByText('Google')).toBeTruthy();
        });
    });

    it('deve chamar logout ao clicar em "Sair"', () => {
        const { getByText } = render(<HomeScreen />);
        fireEvent.press(getByText('Sair'));
        expect(mockLogout).toHaveBeenCalled();
    });
});
