import { 
    View,
    ScrollView,
    SafeAreaView, 
    Text,
    TouchableOpacity
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

import TabHeader from '../components/TabHeader';
import TrendingMovies from '../components/TrendingMovies';
import { MainNavigationParams } from '../navigators/MainNavigation';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
    
    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-row items-center mb-4'>
                <View className='flex-1 self-center'>
                    <TabHeader initialLetter='M' title='ovies' />
                </View>
                
                <TouchableOpacity className='justify-end' onPress={() => navigation.navigate('Search')}>
                    <AntDesign name="search1" size={24} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
            >
                <View className='my-2' />
                <TrendingMovies />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;