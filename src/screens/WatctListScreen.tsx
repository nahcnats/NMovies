import { View, Text, SafeAreaView, ScrollView, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { TMDB_IMAGE_PATH } from '@env';

import { useRefreshOnFocus } from '../hooks/useFreshOnFocus';
import { MainNavigationParams } from '../navigators/MainNavigation';

import TabHeader from '../components/TabHeader';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getWatchlist } from '../services/profile-services';
import { useProfile } from '../hooks/useProfile';
import { useUserStore } from '../store/userStore';
// import { useAppSelector } from '../store/store';
import { useWatchlist } from '../hooks/useWatchlist';
import { customTransition } from '../utils';

const { width, height } = Dimensions.get('window');

const WatctListScreen = () => {
    const { request_token } = useUserStore(state => state.value);
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

    const {
        isLoading: isProfileLoading,
        isSuccess: isProfileSuccess,
        isError: isProfileError,
        data: profile,
        error: profileError,
        refetch: profileRefetch
    } = useProfile({ session_id: request_token });

    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
        refetch
    } = useWatchlist({ account_id: profile?.id || 0 })

    useRefreshOnFocus(profileRefetch);
    useRefreshOnFocus(refetch);
    

    if ((isLoading || isProfileLoading) && (!data || !profile)) {
        return <Loading />;
    }

    if (isError || isProfileError) {
        return <Error />;
    }
    
    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-row items-center mb-4'>
                <View className='flex-1 self-center'>
                    <TabHeader initialLetter='My' title=' Watch List' />
                </View>
            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className='space-y-3'
            >
                <Text className='text-white text-ms font-semibold ml-1'>Results {data?.results.length}</Text>
                <View className='flex-row justify-between flex-wrap'>
                    {
                        data?.results && data?.results.map((item, index) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => navigation.push('MovieDetails', { movieId: item.id })}
                                >
                                    <View className='space-y-2 mb-4'>
                                        <Animated.Image
                                            className='rounded-3xl'
                                            source={{uri: `${TMDB_IMAGE_PATH}/${item?.poster_path}`}}
                                            style={{
                                                width: width * 0.44,
                                                height: height * 0.3
                                            }}
                                            sharedTransitionStyle={customTransition}
                                            sharedTransitionTag={`${item.id}`}
                                        />
                                        <Text className='text-xs text-neutral-400'>
                                            {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default WatctListScreen;