import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import {
    Box,
    Text,
    VStack,
    useToast,
    Icon,
    Slide,
    useDisclose,
    Pressable,
} from 'native-base';
import Feather from '@react-native-vector-icons/feather';
import { useAuth } from '../../context/AuthContext';
import { getSystemVersion, getDeviceManufacturer } from '../../modules/DeviceInfoModule';
import { useThemeStore } from '../../store/themeStore';

export default function HomeScreen() {
    const { user, logout } = useAuth();
    const toast = useToast();
    const [systemVersion, setSystemVersion] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const { isOpen, onOpen } = useDisclose();
    const { theme } = useThemeStore();

    useEffect(() => {
        onOpen();
        getSystemVersion().then(setSystemVersion).catch(console.error);
        getDeviceManufacturer().then(setManufacturer).catch(console.error);
    }, []);

    const signOut = useCallback(() => {
        logout();
        setTimeout(() => {
            toast.show({
                title: 'Sessão encerrada',
                description: 'Você saiu do aplicativo.',
                bgColor: 'red.500',
                placement: 'top',
                duration: 3000,
            });
        }, 300);
    }, [logout, toast]);

    const bgMain = theme === 'dark' ? 'coolGray.900' : 'coolGray.50';
    const cardBg = theme === 'dark' ? 'coolGray.800' : 'white';
    const textPrimary = theme === 'dark' ? 'gray.200' : 'gray.800';
    const textSecondary = theme === 'dark' ? 'gray.400' : 'gray.500';

    return (
        <Box flex={1} bg={bgMain} safeArea py="6">
            <Box position="absolute" top="10" right="4">
                <Box bg="primary.500" p="3" rounded="full" shadow="2">
                    <Icon as={Feather} name="user" size="lg" color="white" />
                </Box>
            </Box>

            <Slide in={isOpen} placement="bottom" duration={500}>
                <VStack space={6} mt={6} px="4">
                    <VStack
                        space={2}
                        alignItems="flex-start"
                        w="100%"
                        mb="20"
                        borderBottomWidth="1"
                        borderBottomColor={textSecondary}
                        pb="4"
                    >
                        <Text fontSize="sm" color={textSecondary}>
                            Bem-vindo de volta,
                        </Text>
                        <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>
                            {user?.email
                                ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
                                : 'Usuário'}
                        </Text>
                    </VStack>


                    <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                        <Box bg={cardBg} width="48%" height={32} p="4" mb="4" rounded="2xl" shadow="1" justifyContent="center">
                            <Box flexDirection="row" alignItems="center" mb="1">
                                <Icon as={Feather} name="cpu" size="sm" color={textSecondary} mr="1" />
                                <Text fontSize="sm" color={textSecondary}>
                                    Fabricante
                                </Text>
                            </Box>
                            <Text fontSize="md" fontWeight="medium" color={textPrimary}>
                                {manufacturer || 'Indisponível'}
                            </Text>
                        </Box>

                        <Box bg={cardBg} width="48%" height={32} p="4" mb="4" rounded="2xl" shadow="1" justifyContent="center">
                            <Box flexDirection="row" alignItems="center" mb="1">
                                <Icon as={Feather} name="smartphone" size="sm" color={textSecondary} mr="1" />
                                <Text fontSize="sm" color={textSecondary}>
                                    {Platform.OS === 'android' ? 'Versão do Android' : 'Versão do iOS'}
                                </Text>
                            </Box>
                            <Text fontSize="md" fontWeight="medium" color={textPrimary}>
                                {systemVersion || 'Indisponível'}
                            </Text>
                        </Box>

                        <Box bg={cardBg} width="48%" height={32} p="4" mb="4" rounded="2xl" shadow="1" justifyContent="center">
                            <Box flexDirection="row" alignItems="center" mb="1">
                                <Icon as={Feather} name="mail" size="sm" color={textSecondary} mr="1" />
                                <Text fontSize="sm" color={textSecondary}>
                                    Email
                                </Text>
                            </Box>
                            <Text fontSize="md" fontWeight="medium" color={textPrimary}>
                                {user?.email || 'Indisponível'}
                            </Text>
                        </Box>

                        <Pressable onPress={signOut} width="48%" height={32} mb="4">
                            <Box
                                flex={1}
                                borderWidth="2"
                                borderColor="red.500"
                                bg="transparent"
                                rounded="2xl"
                                p="4"
                                position="relative"
                                overflow="hidden"
                            >
                                <Box position="absolute" top="2" left="2" p="2">
                                    <Icon
                                        as={Feather}
                                        name="log-out"
                                        size="md"
                                        color="red.500"
                                    />
                                </Box>

                                <Box position="absolute" bottom="2" right="2" p="2">
                                    <Text
                                        fontSize="md"
                                        fontWeight="bold"
                                        color="red.500"
                                    >
                                        Sair
                                    </Text>
                                </Box>
                            </Box>
                        </Pressable>
                    </Box>

                </VStack>
            </Slide>
        </Box>
    );
}
