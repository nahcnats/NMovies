import { 
    View, 
    Text, 
    SafeAreaView, 
    Dimensions, 
    TextInput, 
    TouchableOpacity,
    ScrollView, 
    Pressable
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { debounce } from 'lodash';
import Animated from 'react-native-reanimated';
import { TMDB_IMAGE_PATH } from '@env';

import { MainNavigationParams } from '../navigators/MainNavigation';
import { searchMovies, searchMoviesProp  } from '../services/movies-services';
import { WatchList } from '../models/WatchList';

import Loading from '../components/Loading';
import Error from '../components/Error';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
    const [results, setResults] = useState<WatchList["results"]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (value: string) => {
        if (value && value.length > 2 ) {
            try {
                setIsLoading(true);

                const payload = {
                    query: value,
                    page: 1
                } as searchMoviesProp;

                const res = await searchMovies(payload);

                if (res.results) {
                    setResults(res.results);
                }

                setIsLoading(false);
            } catch (err: any) {
                setIsLoading(false);
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: err.message,
                    autoClose: 2000,
                });
            }
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
    
    return (
        <SafeAreaView className='flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-tertiary rounded-full'>
                <TextInput 
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-sm font-semibold text-white'
                />
                <TouchableOpacity
                    className='rounded-full p-3 m-1'
                    onPress={() => navigation.navigate('BottomTab')}
                >
                    <AntDesign name="closecircleo" size={24} color="lightgray" />
                </TouchableOpacity>
            </View>
            {/* TODO: Should use flatlist to display large set of data.  */}
            {
                isLoading ? <Loading /> : <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className='space-y-3'
                >
                    <Text className='text-white text-ms font-semibold ml-1'>Results {results.length}</Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {
                            results && results.map((item, index) => {
                                return (
                                    <Pressable
                                        key={item.id}
                                        onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
                                    >
                                        <View className='space-y-2 mb-4'>
                                            <Image
                                                className='rounded-3xl'
                                                source={{uri: `${TMDB_IMAGE_PATH}/${item?.poster_path}`}}
                                                style={{
                                                    width: width * 0.44,
                                                    height: height * 0.3
                                                }}
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
            }
        </SafeAreaView>
    );
};

export default SearchScreen;