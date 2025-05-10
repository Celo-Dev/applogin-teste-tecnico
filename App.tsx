import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import reactotron from "./src/config/ReactotronConfig";
import { NavigationContainer } from '@react-navigation/native';

if (__DEV__) reactotron.connect();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <AuthProvider>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
