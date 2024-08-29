import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BackHeader() {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={34} color='#01b4e4' />
        </Pressable>
    );
}