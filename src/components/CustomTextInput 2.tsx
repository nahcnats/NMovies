import { View, Text, TextInput as RNTextInput, TextInputProps, } from 'react-native';
import React from 'react';

import { IS_ANDROID } from '../utils';

interface CustomTextInputProp extends TextInputProps {
    label: string,
    errorMessage?: string,
}

const CustomTextInput = ({ label, errorMessage, ...textInputProps }: CustomTextInputProp) => {
    return (
        <View className='gap-y-6'>
            <Text className='text-sm text-white font-semibold'>{label}</Text>
            <View className='flex-row flex-1 justify-between items-center'>
                <RNTextInput
                    className={`flex-1 border border-secondary bg-white h-10 rounded-lg ${IS_ANDROID ? 'py-[2] px-[6]' : 'p-[6]'}`}
                    autoCorrect={false}
                    autoCapitalize="none"
                    {...textInputProps}
                />
            </View>
            
            {!!errorMessage && (
                <Text className='text-red-500 text-sm'>{errorMessage}</Text>
            )}
        </View>
    );
}

export default CustomTextInput;