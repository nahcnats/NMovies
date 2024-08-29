import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

type AvartarProps = {
    uriPath: string,
    size: 'small' |'large'
}

const { width, height } = Dimensions.get('window');
const largeSize = {
    height: height * 0.43,
    width: width * 0.74 
}
const smallSize = {
    height: 64,
    width: 64
}

const Avatar = ({ uriPath, size }: AvartarProps) => {
    const NoImage = () => {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className=' text-neutral-400 text-center'>NO IMAGE</Text>
            </View>
        );
    }

    return (
        <View className='flex-row justify-center'>
            {
                size === 'large'
                    ? <View className='items-center rounded-full overflow-hidden h-72 w-72 border border-secondary'>
                        {
                            uriPath !== ''
                                ? <Image
                                    source={uriPath}
                                    style={largeSize}
                                    contentFit="cover"
                                    className='rounded-3xl mb-2 '
                                />
                                : <NoImage />
                        }
                    </View>
                    : <View className='items-center rounded-full overflow-hidden h-16 w-16 border border-secondary'>
                        {
                            uriPath !== ''
                                ? <Image
                                    source={uriPath}
                                    style={smallSize}
                                    contentFit="cover"
                                    className='rounded-3xl mb-2'
                                />
                                : <NoImage />
                        }
                    </View>
            }
        </View>
    );
}

export default Avatar;