import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { queryClient, IS_ANDROID } from './src/utils';

import RootNavigation from './src/navigators/RootNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AlertNotificationRoot toastConfig={{ titleStyle: { color: 'red' } }}>
            <StatusBar barStyle='light-content' />
            <RootNavigation />
          </AlertNotificationRoot>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};