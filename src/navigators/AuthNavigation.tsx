import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import AuthScreen from '../screens/AuthScreen';

export type AuthNavigationParams = {
    Auth: undefined,
}

const Stack = createNativeStackNavigator<AuthNavigationParams>();

export default function () {
    const defaultNavOptions = {
        headerStyle: {
            backgroundColor: 'transparent'
        },
        headerShadowVisible: false,
    }

    return (
        <Stack.Navigator
            initialRouteName='Auth'
            screenOptions={defaultNavOptions}
        >
            <Stack.Screen
                name='Auth'
                component={AuthScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

