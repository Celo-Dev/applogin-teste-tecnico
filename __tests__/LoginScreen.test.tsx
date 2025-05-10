import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/features/login/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const mockLogin = jest.fn();
const mockToastShow = jest.fn();

jest.mock('../src/context/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin,
    }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('native-base', () => {
    const actualNativeBase = jest.requireActual('native-base');
    return Object.assign({}, actualNativeBase, {
        useToast: () => ({
            show: mockToastShow,
        }),
    });
});


jest.mock('../src/services/authService', () => ({
    loginUser: jest.fn((email, senha) => {
        if (email === 'john@mail.com' && senha === 'changeme') {
            return Promise.resolve({ email });
        } else {
            return Promise.reject({
                response: { data: { message: 'Credenciais inválidas' } },
            });
        }
    }),
}));

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve logar com e-mail e senha corretos', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('E-mail'), 'john@mail.com');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'changeme');
        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ email: 'john@mail.com' });
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
            expect(mockToastShow).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Login realizado com sucesso',
                    description: 'Bem-vindo, john',
                })
            );
        });
    });

    it('deve exibir erro com credenciais inválidas', async () => {
        const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('E-mail'), 'wrong@mail.com');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'wrongpass');
        fireEvent.press(getByText('Login'));

        expect(await findByText('Erro no login')).toBeTruthy();
        expect(mockToastShow).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Erro no login',
                description: 'Credenciais inválidas',
            })
        );
    });
});
