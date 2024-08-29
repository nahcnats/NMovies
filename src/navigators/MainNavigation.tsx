import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from 'tailwindcss/colors';
import { useNavigation } from "@react-navigation/native";

import BackHeader from '../components/BackHeader';
import BottomNavigation from './BottomNavigation';
import MovieDetailScreen from '../screens/MovieDetails';
import MovieReviewListingScreen from '../screens/MovieReviewListingScreen';
import SearchScreen from '../screens/SearchScreen';

export type MainNavigationParams = {
    Dashboard: undefined,
    BottomTab: undefined | { screen?: string },
    MovieDetails: { movieId: number},
    ReviewListing: { movieId: number, movieTitle: string },
    Search: undefined
}

const Stack = createNativeStackNavigator<MainNavigationParams>();

const MainNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

    const defaultNavOptions = {
        headerStyle: {
            backgroundColor: 'transparent'
        },
        headerShadowVisible: false,
        headerTintColor: colors.black,
    }

    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={defaultNavOptions}
        >
            <Stack.Screen
                name='BottomTab'
                component={BottomNavigation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Group
                key='SubScreens'
                screenOptions={{
                headerStyle:{
                        backgroundColor: 'black',
                },
                headerShown: false
                // headerTitle: "",
                // // headerLeft: () => <BackHeader />,
                // headerBackTitleVisible: false,
                }}
            >
                <Stack.Screen
                    name='MovieDetails'
                    component={MovieDetailScreen}
                />
                <Stack.Screen
                    name='ReviewListing'
                    component={MovieReviewListingScreen}
                />
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default MainNavigation;