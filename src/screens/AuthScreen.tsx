import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
import { useMMKVObject } from "react-native-mmkv";

import { IS_ANDROID, dismissKeyboard } from '../utils';
import { 
    getRequestToken, 
    loginWithPassword, 
    loginWithPasswordProps 
} from '../services/auth-services';

import CustomTextInput from '../components/CustomTextInput';
import { AuthState, useUserStore } from '../store/userStore';
import { storage } from '../store/storage';

const signInFormSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required',
            invalid_type_error: 'Name must be a string'
        })
        .min(2),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string'
        })
        .min(2),
});

type TSignInFormSchema = z.infer<typeof signInFormSchema>;

const AuthScreen = () => {
    const logIn = useUserStore((state) => state.logIn);
    const [credentials, setCredential] = useMMKVObject<AuthState>('user-storage', storage);
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<TSignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const getNewRequestToken = async () => {
        try {
            return await getRequestToken();
        } catch (err: any) {
            throw err;
        }
    }

    const onSubmit: SubmitHandler<TSignInFormSchema> = async (data) => {
        try {
            setIsLoading(true);

            const requestTokenRes = await getNewRequestToken();

            if (!requestTokenRes) return;

            const payload = {
                username: data.username,
                password: data.password,
                request_token: requestTokenRes.request_token
            } as loginWithPasswordProps;

            const logInRes = await loginWithPassword(payload);

            if (logInRes?.success !== true) {
                throw new Error(logInRes.status_message);
            };

            setCredential(payload);

            logIn(payload);
        } catch (err: any) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: err.message,
                autoClose: 2000,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (

        <KeyboardAvoidingView 
            className='flex-1'  
            behavior={!IS_ANDROID ? 'padding' : 'height'}
            onStartShouldSetResponder={dismissKeyboard}
        >
            <View className='flex-1 justify-center p-4'>
                <View className='mb-12 justify-center items-center'>
                    <Text className='text-lg text-secondary font-bold'><Text className='text-lg text-tertiary'>M</Text>ovie App</Text>
                </View>
                <Controller
                    control={methods.control}
                    name='username'
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                            <CustomTextInput
                                label='Username'
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                errorMessage={error?.message}
                                autoFocus={true}
                            />
                        )
                    }}
                />
                <View className='my-6' />
                <Controller
                    control={methods.control}
                    name='password'
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                            <CustomTextInput
                                label='Password'
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                errorMessage={error?.message}
                                secureTextEntry={true}
                            />
                        )
                    }}
                />
                <TouchableOpacity
                    className='bg-tertiary self-center p-4 w-32 mt-16 rounded-lg'
                    onPress={methods.handleSubmit(onSubmit)}
                    disabled={isLoading}
                >
                    <Text className='text-sm text-primary font-semibold self-center'>{isLoading ? 'Wait...' : 'Sign In'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;