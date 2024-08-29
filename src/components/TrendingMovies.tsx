import { View, Text, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TMDB_IMAGE_PATH } from '@env';

import { IS_ANDROID, customTransition } from '../utils';

import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { TrendingMovie } from '../models/TrendingMovie';

import { MainNavigationParams } from '../navigators/MainNavigation';
import Loading from './Loading';
import Error from './Error';

interface MovieCardProps {
    item: TrendingMovie
}

const { width, height } = Dimensions.get('window');
const PAGE_WIDTH = width;

const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: height
} as const;

const TrendingMovies = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
    const [autoPlay, setAutoPlay] = useState(false);
    // const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
    // const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
    const progressValue = useSharedValue<number>(0);
    
    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
        refetch
    } = useTrendingMovies();

    const MovieCard = ({ item }: MovieCardProps) => {
        const imageUri = `${TMDB_IMAGE_PATH}/${item.poster_path}`;

        return (
            <Pressable
                onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
            >
                <Animated.Image
                    // source={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_PATH}/${item.poster_path}`}
                    source={{ uri: imageUri }}
                    style={{
                        width: width - 10,
                        height: height / 1.6
                    }}
                    // contentFit="cover"
                    resizeMode='cover'
                    className='rounded-2xl mb-4'
                    sharedTransitionStyle={customTransition}
                    sharedTransitionTag={`${item.id}`}
                />
                <Text className='text-white opacity-60 text-lg self-center' numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
            </Pressable>
        )
    }

    if (isLoading && !data) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <View className='mb-8 mx-2'>
            <Text className='text-xl text-white font-semibold'>Trending</Text>
            <Carousel
                {...baseOptions}
                style={{
                    width: PAGE_WIDTH,
                }}
                loop
                // pagingEnabled={pagingEnabled}
                // snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={1500}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 47,
                }}
                data={data || []}
                renderItem={({ item }) => <MovieCard item={item} />}
            />
        </View>
    );
};

export default TrendingMovies;