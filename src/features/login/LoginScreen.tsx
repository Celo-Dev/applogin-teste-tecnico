import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../services/authService';
import { isValidEmail } from '../../utils/validators';

import { useAuth } from '../../context/AuthContext';
import { useThemeStore } from '../../store/themeStore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    VStack,
    Input,
    Button,
    Box,
    Heading,
    Center,
    useToast,
    Text,
    IconButton,
    CheckCircleIcon,
    WarningIcon,
    ScaleFade,
    Icon,
    Fade,
    Slide
} from 'native-base';

import Feather from '@react-native-vector-icons/feather';

type FormData = {
    email: string;
    senha: string;
};


export default function LoginScreen() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ mode: 'onSubmit' });
    const toast = useToast();
    const { login } = useAuth();
    const { theme, changeTheme } = useThemeStore();
    const [emailInput, setEmailInput] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const loadEmail = async () => {
            const savedEmail = await AsyncStorage.getItem('lastEmail');
            if (savedEmail) {
                setEmailInput(savedEmail);
                reset({ email: savedEmail });
            }
        };
        loadEmail();
    }, []);

    isValidEmail(emailInput)

    async function submit(data: FormData) {
        const { email, senha } = data;

        try {
            const user = await loginUser(email, senha)
            login(user);

            toast.show({
                title: 'Login realizado com sucesso',
                description: `Bem-vindo, ${email.split('@')[0]}`,
                bgColor: 'green.500',
            });

        } catch (error: any) {
            toast.show({
                title: 'Erro no login',
                description: error?.response?.data?.message || 'Erro inesperado',
                bgColor: 'red.500',
            });
        }
    }

    return (

        <Center
            flex={1}
            px="4"
            bg={theme === 'dark' ? 'coolGray.900' : 'gray.100'}
        >
            <Box position="absolute" bottom="4" right="4" alignItems="center" zIndex={10}>
                <IconButton
                    icon={
                        <Icon
                            as={Feather}
                            name={theme === 'light' ? 'sun' : 'moon'}
                            size="md"
                            color={theme === 'dark' ? 'blue.500' : 'yellow.600'}
                        />
                    }
                    onPress={changeTheme}
                    borderRadius="full"
                    _pressed={{ bg: 'gray.300' }}
                    bg={theme === 'dark' ? 'coolGray.700' : 'gray.200'}
                />
                <Text mt="1" fontSize="xs" color="coolGray.500">
                    Tema: {theme === 'light' ? 'Claro' : 'Escuro'}
                </Text>
            </Box>

            <Slide in={true} duration={600}>
                <Center flex={1}>
                    <Box
                        p="6"
                        w="90%"
                        maxW="360"
                        borderRadius="2xl"
                        bg={theme === 'dark' ? 'coolGray.800' : 'white'}
                        shadow="9"
                    >
                        <Heading
                            size="xl"
                            fontWeight="bold"
                            textAlign="center"
                            color={theme === 'dark' ? 'white' : 'coolGray.800'}
                        >
                            Bem-vindo
                        </Heading>
                        <Text
                            mt="1"
                            fontSize="sm"
                            textAlign="center"
                            color={theme === 'dark' ? 'gray.300' : 'coolGray.600'}
                        >
                            Faça login para continuar!
                        </Text>

                        <VStack space={4} mt="6">
                            <Controller
                                control={control}
                                name="email"
                                defaultValue={emailInput}
                                rules={{
                                    required: 'E-mail é obrigatório',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            variant="filled"
                                            placeholder="E-mail"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            onBlur={() => {
                                                onBlur();
                                                setIsInputFocused(false);
                                            }}
                                            onFocus={() => setIsInputFocused(true)}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setEmailInput(text);
                                            }}
                                            value={value}
                                            borderRadius="xl"
                                            bg={theme === 'dark' ? 'coolGray.700' : 'gray.200'}
                                            _focus={{
                                                borderColor: 'primary.500',
                                                bg: 'white'
                                            }}
                                            color={
                                                isInputFocused
                                                    ? 'black'
                                                    : theme === 'dark'
                                                        ? 'white'
                                                        : 'black'
                                            }

                                        />
                                        {emailInput.length > 0 && (
                                            <Box mt="2">
                                                <ScaleFade in={true}>
                                                    {isValidEmail(emailInput) ? (
                                                        <Box flexDir="row" alignItems="center">
                                                            <CheckCircleIcon color="green.500" size="4" mr="1" />
                                                            <Text fontSize="xs" color="green.600">E-mail válido</Text>
                                                        </Box>
                                                    ) : (
                                                        <Box flexDir="row" alignItems="center">
                                                            <WarningIcon color="red.500" size="4" mr="1" />
                                                            <Text fontWeight={700} fontSize="xs" color="red.600">Formato inválido</Text>
                                                        </Box>
                                                    )}
                                                </ScaleFade>
                                            </Box>
                                        )}

                                        {errors.email && (
                                            <Text color="red.500" fontSize="xs">
                                                {errors.email.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />

                            <Controller
                                control={control}
                                name="senha"
                                rules={{ required: 'Senha é obrigatória' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            variant="filled"
                                            placeholder="Senha"
                                            type={showPassword ? "text" : "password"}
                                            onBlur={() => {
                                                onBlur();
                                                setIsInputFocused(false);
                                            }}
                                            onFocus={() => setIsInputFocused(true)}
                                            onChangeText={onChange}
                                            value={value}
                                            borderRadius="xl"
                                            bg={theme === 'dark' ? 'coolGray.700' : 'gray.200'}
                                            _focus={{
                                                borderColor: 'primary.500',
                                                bg: 'white'
                                            }}
                                            color={
                                                isInputFocused
                                                    ? 'black'
                                                    : theme === 'dark'
                                                        ? 'white'
                                                        : 'black'
                                            }
                                            InputRightElement={
                                                <IconButton
                                                    icon={
                                                        <Icon
                                                            as={Feather}
                                                            name={showPassword ? "eye" : "eye-off"}
                                                            size="md"
                                                            color="blue.400"
                                                        />
                                                    }
                                                    onPress={() => setShowPassword(!showPassword)}
                                                    variant="unstyled"
                                                />
                                            }
                                        />
                                        {errors.senha && (
                                            <Text color="red.500" fontSize="xs">
                                                {errors.senha.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />

                            <Fade in={true}>
                                <Button
                                    mt="2"
                                    colorScheme="primary"
                                    onPress={handleSubmit(submit)}
                                    borderRadius="xl"
                                    _pressed={{ opacity: 0.8 }}
                                >
                                    Login
                                </Button>
                            </Fade>
                        </VStack>
                    </Box>
                </Center>
            </Slide>
        </Center>
    );
}
