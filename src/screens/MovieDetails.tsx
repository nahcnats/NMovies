import { 
	ScrollView, 
	View, 
	Text, 
	SafeAreaView, 
	TouchableOpacity,
	Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'tailwindcss/colors';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInUp, FadeOut, FadeOutDown, FadeOutUp, withSpring } from 'react-native-reanimated';
import { TMDB_IMAGE_PATH } from '@env';

import { IS_ANDROID, customTransition } from '../utils';

import { useUserStore } from "../store/userStore";
import { MainNavigationParams } from '../navigators/MainNavigation';
import { useMovie } from '../hooks/useMovie';
import { useRefreshOnFocus } from '../hooks/useFreshOnFocus';
import { useProfile } from '../hooks/useProfile';
import MovieDetailsFooter from '../components/MovieDetailFooter';
import { useAddWatchlist } from '../hooks/useAddWatchList';
import { useWatchlist } from '../hooks/useWatchlist';
import Loading from '../components/Loading';
import Error from '../components/Error';

const { width, height } = Dimensions.get('window');
const topMargin = IS_ANDROID ? 'mt-3' : ''

type Props = NativeStackScreenProps<MainNavigationParams, 'MovieDetails'>;

const MovieDetailScreen = ({ route }: Props) => {
	const { request_token } = useUserStore((state) => state.value);
	const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
	const { movieId } = route.params;
	const [isWatchList, setIsWatchList] = useState(false);

	const {
		isLoading,
		isSuccess,
		isError,
		data,
		error,
		refetch
	} = useMovie({ movieId: movieId });

	const {
		isLoading: isProfileLoading,
		isSuccess: isProfileSuccess,
		isError: isProfileError,
		data: profile,
		error: profileError,
		refetch: profileRefetch
	} = useProfile({ session_id: request_token });

	const {
		isLoading: isWatchlistLoading,
		isSuccess: isWatchlistSuccess,
		isError: isWatchlistError,
		data: watchlist,
		error: watchlistError,
		refetch: watchlistRefetch
	} = useWatchlist({ account_id: profile?.id || 0 })

	useRefreshOnFocus(refetch);
	useRefreshOnFocus(profileRefetch);

	const { mutateAsync: addWatchlist } = useAddWatchlist();

	useEffect(() => {
		// TODO: Not the best way to filter data. API should handle this
		const watchlistMovie = watchlist?.results.filter(item => item.id === movieId);

		if (watchlistMovie?.length) {
			setIsWatchList(true);
		}
	}, [isWatchlistSuccess]);

	const addMovieWatchlists = async () => {
		try {
			await addWatchlist({
				media_id: movieId,
				account_id: profile?.id || 0
			});

			setIsWatchList(true);
		} catch (err: any) {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: 'Error',
				textBody: err.message,
				autoClose: 2000,
			});
		}
	}

	if ((isLoading || isProfileLoading || isWatchlistLoading) && (!data || !profile || !watchlist)) {
		return <Loading />
	}

	if (isError || isProfileError || isWatchlistError) {
		return <Error />
	}

	return (
		<ScrollView
			className='flex-1'
		>
			<View className='w-full'>
				<SafeAreaView className={`absolute z-20 w-full flex-row justify-between item-center px-4 ${topMargin}`}>
					<TouchableOpacity
						className='mx-2'
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="chevron-back-circle" size={34} color='#01b4e4' />	
					</TouchableOpacity>
					<TouchableOpacity
						className='mx-2'
						onPress={addMovieWatchlists}
					>
						<Fontisto name='favorite' size={26} color={isWatchList ? colors.yellow[500] : colors.white} />
					</TouchableOpacity>
				</SafeAreaView>
				<View>
					<Animated.Image
						source={{ uri: `${TMDB_IMAGE_PATH}/${data?.poster_path}`}}
						style={{
							width: width,
							height: height * 0.55
						}}
						resizeMode='cover'
						className='rounded-3xl mb-2 '
						sharedTransitionStyle={customTransition} 
						sharedTransitionTag={`${movieId}`}
						entering={
							FadeInUp.delay(600)
						}
					/>
					<LinearGradient
						colors={['transparent', 'rgba(20, 20, 20, .3)', 'rgba(20, 20, 20, 1)']}
						style={{
							width,
							height: height * 0.40
						}}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
						className='absolute bottom-0'
					/>
				</View>
			</View>
			<View style={{ marginTop: -height * 0.09}} className='space-y-3'>
				<Text className='text-white text-center text-2xl font-bold tracking-wider'>{data?.title}</Text>
				<Text
					className='text-neutral-400 font-semibold text-sm text-center'
				>
					{`${data?.status} * ${data?.release_date} * ${data?.runtime} min`}
				</Text>
				<View className='flex-row justify-center mx-4 space-x-2'>
					{
						data?.genres.map((item) => 
							<Text
								key={item.id}
								className='text-neutral-400 font-semibold text-sm text-center'
							>
								{item.name}
							</Text>
						)
					}
				</View>
				<Text
					className='text-neutral-400 mx-4 tracking-wide text-sm'
				>
					{data?.overview}
				</Text>
				<MovieDetailsFooter movieId={movieId} movieTitle={data?.title || ''} />
			</View>
		</ScrollView>
	);
};

export default MovieDetailScreen;