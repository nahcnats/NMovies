import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { TMDB_IMAGE_PATH } from '@env';

import { useUserStore } from '../store/userStore';
import { useRefreshOnFocus } from '../hooks/useFreshOnFocus';
import { useProfile } from '../hooks/useProfile';

import TabHeader from '../components/TabHeader';
import Avatar from '../components/Avatar';
import Error from '../components/Error';
import Loading from '../components/Loading';


const ProfileScreen = () => {
    const { request_token } = useUserStore((state) => state.value);
    const logOut = useUserStore((state) => state.logOut);

    const {
        isLoading: isProfileLoading,
        isSuccess: isProfileSuccess,
        isError: isProfileError,
        data: profile,
        error: profileError,
        refetch: profileRefetch
    } = useProfile({ session_id: request_token });

    useRefreshOnFocus(profileRefetch);
    
    if ((isProfileLoading) && (!profile)) {
        return <Loading />;
    }

    if (isProfileError) {
        return <Error />;
    }
    
    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-row items-center mb-4'>
                <View className='flex-1 self-center'>
                    <TabHeader initialLetter='My' title=' Profile' />
                </View>
            </SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
            >
                {
                    profile?.avatar && profile?.avatar.tmdb.avatar_path !== '' || profile?.avatar.tmdb.avatar_path !== null
                        ? <Avatar uriPath={`${TMDB_IMAGE_PATH}/${profile?.avatar.tmdb.avatar_path}`} size='large' />
                        : <Avatar uriPath='' size='large' />
                }
                <View className='mt-8 mx-4 space-y-2'>
                    <Text className='text-sm text-white'><Text className='font-bold text-tertiary'>ID: </Text>{profile?.id}</Text>
                    <Text className='text-sm text-white'><Text className='font-bold text-tertiary'>Name:  </Text>{profile?.name}</Text>
                    <Text className='text-sm text-white'><Text className='font-bold text-tertiary'>Username: </Text>{profile?.username}</Text>
                </View>
                <TouchableOpacity
                    className='bg-tertiary self-center p-4 w-32 mt-16 rounded-lg'
                    onPress={logOut}
                >
                    <Text className='text-sm text-primary font-semibold self-center'>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;