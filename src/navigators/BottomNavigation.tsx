import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from 'tailwindcss/colors';
import { Entypo, Fontisto, AntDesign } from '@expo/vector-icons'; 

import { IS_ANDROID } from '../utils';
import { MainNavigationParams } from './MainNavigation';
import HomeScreen from '../screens/HomeScreen';
import WatctListScreen from '../screens/WatctListScreen';
import ProfileScreen from '../screens/ProfileScreen';

type BottomTabNavigationParams = {
    Home: undefined,
    WatchList: undefined,
    Profile: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabNavigationParams>();
const activeColor = '#90cea1';
const inactiveColor = '#01b4e4'

const BottomNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            backBehavior='history'
            screenOptions={{
                tabBarShowLabel: true,
                tabBarStyle: [
                    {
                        position: 'absolute',
                        borderTopWidth: 0,
                        borderTopColor: "transparent",
                        backgroundColor: '#0d253f',
                        overflow: 'hidden',
                    },
                    IS_ANDROID && { height: 55, paddingBottom: 5 },
                ],
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarLabelPosition: 'below-icon',
                headerShown: false
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => <Entypo name='home' size={24} color={focused ? activeColor : inactiveColor} />
                }}
            />
            <BottomTab.Screen
                name="WatchList"
                component={WatctListScreen}
                options={{
                    tabBarLabel: 'Watch List',
                    tabBarIcon: ({ focused }) => <Fontisto name='favorite' size={24} color={focused ? activeColor : inactiveColor} />
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => <AntDesign name='user' size={24} color={focused ? activeColor : inactiveColor} />
                }}
            />
        </BottomTab.Navigator>
    );
}

export default BottomNavigation;