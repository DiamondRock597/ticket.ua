import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { CityCard } from "./components/CityCard";
import { useCityScreen } from "./useCityScreen";
import { useAppSelector } from "@/src/store/hooks";
import { selectTopEvents } from "@/src/store/eventsSlice";
import { formatDate } from "@/src/utils/formatDate";
import type { Event } from "@/src/types/event";
import { styles } from "./styles";

const CARD_WIDTH = 280;
const CARD_MARGIN = 12;

function TopEventCard({
  event,
  index,
  onPress,
}: {
  event: Event;
  index: number;
  onPress: () => void;
}) {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <AnimatedTouchable
      entering={FadeInRight.delay(index * 60).springify()}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.topCard,
        { width: CARD_WIDTH, marginRight: index === 4 ? 0 : CARD_MARGIN },
      ]}
    >
      <Image source={{ uri: event.image }} style={styles.topCardImage} />
      <View style={styles.topCardOverlay} />
      <View style={styles.topCardContent}>
        <Text style={styles.topCardDate}>{formatDate(event.date)}</Text>
        <Text style={styles.topCardTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.topCardVenue} numberOfLines={1}>
          {event.venue}
        </Text>
      </View>
    </AnimatedTouchable>
  );
}

export function CityScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cities, handleCityPress } = useCityScreen();
  const topEvents = useAppSelector(selectTopEvents);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app this is where you'd refetch cities/top events from an API
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  }, []);

  const handleTopEventPress = (event: Event) => {
    router.push(`/cities/event/${event.id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        style={styles.header}
      >
        <Text style={styles.logo}>
          Ticket.<Text style={styles.logoAccent}>ua</Text>
        </Text>
      </Animated.View>

      {topEvents.length > 0 && (
        <Animated.View
          entering={FadeInDown.delay(80).duration(400).springify()}
          style={styles.topSection}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="flame" size={20} color="#f59e0b" />
            <Text style={styles.sectionTitle}>{t("city.topEvents")}</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topScroll}
          >
            {topEvents.map((event, index) => (
              <TopEventCard
                key={event.id}
                event={event}
                index={index}
                onPress={() => handleTopEventPress(event)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      )}

      <View style={styles.sectionHeader}>
        <Ionicons name="location" size={20} color="#6366f1" />
        <Text style={styles.sectionTitle}>{t("city.citiesSection")}</Text>
      </View>
      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CityCard
            city={item}
            index={index}
            onPress={() => handleCityPress(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}
