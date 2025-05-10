import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export const getSystemVersion = async (): Promise<string> => {
    if (DeviceInfoModule?.getSystemVersion) {
        return await DeviceInfoModule.getSystemVersion();
    }
    return 'indisponível';
};

export const getDeviceManufacturer = async (): Promise<string> => {
    if (DeviceInfoModule?.getManufacturer) {
        return await DeviceInfoModule.getManufacturer();
    }
    return 'indisponível';
};
