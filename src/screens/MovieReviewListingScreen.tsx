import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import colors from 'tailwindcss/colors';
import { TMDB_IMAGE_PATH } from '@env'

import { MainNavigationParams } from '../navigators/MainNavigation';
import { useRefreshOnFocus } from '../hooks/useFreshOnFocus';
import { useReviews } from '../hooks/useReviews';
import { Reviews } from '../models/Reviews';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Avatar from '../components/Avatar';

type Props = NativeStackScreenProps<MainNavigationParams, 'ReviewListing'>;

interface ReviewItemsProps {
    itemData: Reviews['results'][0]
}

const MovieReviewListingScreen = ({ route }: Props) => {
    const { movieId, movieTitle } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
        isFetching, 
        fetchNextPage,
        hasNextPage,
        refetch
    } = useReviews({ movieId });

    useRefreshOnFocus(refetch);

    const LoadMore = ({ isFetching }: { isFetching: boolean }) => {
        return (
            isFetching ? <View className="mt-4" >
                <ActivityIndicator size='large' color={colors.neutral[400]} />
            </View > : null
        );
    }

    const ReviewItem = ({ itemData }: ReviewItemsProps) => {
        const avatarPath = itemData.author_details.avatar_path !== null ? `${TMDB_IMAGE_PATH}/${itemData.author_details.avatar_path}` : '';

        return (
            <View className='flex-row justify-between space-x-4'>
                <View className='justify-start items-center'>
                    <Avatar
                        uriPath={avatarPath}
                        size='small'
                    />
                </View>
                <View className='flex-1 space-y-2'>
                    <Text className='text-white text-lg font-bold'>{itemData.author_details.name}</Text>
                    <View className='space-y-4'>
                        <Text className='text-white'>{itemData.content}</Text> 
                        <Text className='text-neutral-400'>{moment(itemData.updated_at).format('YYYY-MM-DD HH:MM A')}</Text> 
                    </View>
                </View>
                
            </View>
        );
    }

    if ((isLoading) && (!data)) {
        return <Loading />
    }

    if (isError) {
        return <Error />
    }

    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-row items-center mb-4'>
                <TouchableOpacity
                    className='mx-2'
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-circle" size={34} color='#01b4e4' />
                </TouchableOpacity>
            </SafeAreaView>
            <View className='flex-1 mb-24'>
                <View className='w-full mb-4'>
                    <Text className='text-2xl text-tertiary font-bold self-center' numberOfLines={1} ellipsizeMode='tail'>{movieTitle}</Text>
                </View>
                <FlashList
                    data={data?.pages.map(page => page.results).flat()}
                    renderItem={({ item }) => <ReviewItem itemData={item} />}
                    estimatedItemSize={200}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onRefresh={() => refetch()}
                    refreshing={isLoading}
                    ListFooterComponent={<LoadMore isFetching={isFetching} />}
                    ItemSeparatorComponent={() => <View className='h-[0.5] my-3 bg-neutral-400' />}
                    ListEmptyComponent={<Text className='text-sm text-neutral-200'>No reviews</Text>}
                    contentContainerStyle={{
                        padding: 20,
                    }}
                />
            </View>
        </View>
    );
};

export default MovieReviewListingScreen;