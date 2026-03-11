import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import type { Event } from '../../../../types/event';
import { formatDate } from '../../../../utils/formatDate';
import { styles } from './styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  event: Event;
  index: number;
  onPress: () => void;
};

export function EventCard({ event, index, onPress }: Props) {
  return (
    <AnimatedTouchable
      entering={FadeInRight.delay(index * 60).springify()}
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.date}>{formatDate(event.date)}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.venue} numberOfLines={1}>
            {event.venue}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#6366f1" />
        </View>
      </View>
    </AnimatedTouchable>
  );
}
