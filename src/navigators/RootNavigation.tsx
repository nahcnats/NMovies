import React, { useCallback, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useAppState } from '@react-native-community/hooks';
import colors from "tailwindcss/colors";
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { AuthState, useUserStore } from "../store/userStore";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import { useMMKVObject } from "react-native-mmkv";
import { storage } from "../store/storage";

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.black
    }
}

const RootNavigation = () => {
    const currentAppState = useAppState();
    const isAuth = useUserStore((state) => state.value.request_token);
    const [credentials, setCredential] = useMMKVObject<AuthState>('user-storage', storage);
    const logIn = useUserStore((state) => state.logIn);
    const logOut = useUserStore((state) => state.logOut);

    const trySignIn = useCallback(async () => {
        if (!credentials) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Invalid credentials',
                autoClose: 2000,
            });

            logOut();
        }
    }, []);

    useEffect(() => {
        if (currentAppState !== 'active') return;

        // trigger trySignIn only when app state is active
        trySignIn();
    }, [currentAppState]);

    return (
        <NavigationContainer
            theme={MyTheme}
        >
            <BottomSheetModalProvider>
                {
                    isAuth
                        ? <MainNavigation />
                        : <AuthNavigation />
                }
            </BottomSheetModalProvider>
        </NavigationContainer>
    );
}

export default RootNavigation;