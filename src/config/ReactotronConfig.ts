import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const name = 'APPLOGIN';

const host = '192.168.15.37';

console.tron = reactotron;

(reactotron as any).configure({ host, name }).setAsyncStorageHandler(AsyncStorage).useReactNative();

export default reactotron;
