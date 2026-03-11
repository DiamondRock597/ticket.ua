import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { getCityImage } from '@/src/constants/cityImages';
import { styles } from './styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  city: string;
  index: number;
  onPress: () => void;
};

export function CityCard({ city, index, onPress }: Props) {
  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(index * 80).springify()}
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: getCityImage(city) }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.cityName}>{city}</Text>
        <Ionicons name="chevron-forward" size={22} color="#6366f1" style={styles.arrow} />
      </View>
    </AnimatedTouchable>
  );
}
