import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderBar } from '@/src/components/HeaderBar';
import { useEventPageScreen } from './useEventPageScreen';
import { formatDateLong } from '../../utils/formatDate';
import { styles } from './styles';

type Props = {
  eventId: string;
};

export function EventPageScreen({ eventId }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { event, openTickets, openRoute } = useEventPageScreen(eventId);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const scroll = scrollY.value;
    const scale = interpolate(scroll, [0, 220], [1, 0.88], 'clamp');
    const translateY = interpolate(scroll, [0, 220], [0, -24], 'clamp');
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  if (!event) {
    return (
      <View style={styles.container}>
        <HeaderBar title={t('eventPage.notFound')} showBack={true} />
        <Text style={styles.error}>{t('eventPage.notFound')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar title={event.title} showBack={true} />
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View entering={FadeIn.duration(300)} style={[styles.imageWrap, animatedImageStyle]}>
          <Image source={{ uri: event.image }} style={styles.image} />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.body}
        >
          <Text style={styles.city}>{event.city}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>{formatDateLong(event.date)}</Text>
          <Text style={styles.venueLabel}>{t('eventPage.venue')}</Text>
          <Text style={styles.venue}>{event.venue}</Text>
          <Text style={styles.descLabel}>{t('eventPage.description')}</Text>
          <Text style={styles.description}>{event.description}</Text>
        </Animated.View>
      </Animated.ScrollView>
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.bottomBarRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={openRoute}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>
              {t('eventPage.showRoute')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={openTickets}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>{t('eventPage.buyTicket')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
