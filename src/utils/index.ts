import { Platform, Keyboard } from "react-native";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReduceMotion, SharedTransition, withSpring } from 'react-native-reanimated';
import { TMDB_BASE_URL, TMDB_TOKEN } from '@env';

// import { useUserStore } from "../store/userStore";;

export const queryClient = new QueryClient();
export const IS_ANDROID = Platform.OS === 'android';

// const request_token = useUserStore.getState().value.request_token;

// TODO:: implement axios interceptors
export const server = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${TMDB_TOKEN}`,
        // 'Authorization': `Bearer ${request_token}`,
        'Accept': 'application/json'
    }
});

export const dismissKeyboard = () => {
    Keyboard.dismiss();
    return false;
}

export const apiErrorHandler = (error: Error) => {
    let message = 'Opps, something went wrong!';

    if (error.message) {
        message = error.message;
    }

    return new Error(message);
}

export const customTransition = SharedTransition.custom((values) => {
    'worklet';

    return {
        height: withSpring(values.targetHeight),
        width: withSpring(values.targetWidth),
        originX: withSpring(values.targetOriginX),
        originY: withSpring(values.targetOriginY),
        // height: withSpring(values.targetHeight, springConfig),
        // width: withSpring(values.targetWidth, springConfig),
        // originX: withSpring(values.targetOriginX, springConfig),
        // originY: withSpring(values.targetOriginY, springConfig),
    };
});