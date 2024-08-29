import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainNavigationParams } from '../navigators/MainNavigation';

const Error = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
    
    return (
        <View className='flex-1 justify-center items-start'>
            <Text className='text-base text-red-500 font-bold'>Error</Text>
            <Text className='text-base text-tertiary font-semibold' onPress={() => navigation.goBack()}>Go back</Text>
        </View>
    );
};

export default Error;