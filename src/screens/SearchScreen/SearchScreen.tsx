import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAppSelector } from '@/src/store/hooks';
import { selectEvents } from '@/src/store/eventsSlice';
import type { Event } from '@/src/types/event';
import { HeaderBar } from '@/src/components/HeaderBar';
import { EventCard } from '@/src/screens/EventListScreen/components/EventCard';

import { styles } from './styles';

type CategoryKey = 'all' | 'music' | 'business' | 'theatre';

const CATEGORY_ORDER: CategoryKey[] = ['all', 'music', 'business', 'theatre'];

export function SearchScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const events = useAppSelector(selectEvents);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const onPressEvent = useCallback(
    (event: Event) => {
      router.push(`/events/event/${event.id}`);
    },
    [router]
  );

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events.filter((event) => {
      if (activeCategory !== 'all' && event.category !== activeCategory) {
        return false;
      }

      if (!q) return true;

      const haystack = (
        event.title +
        ' ' +
        event.description +
        ' ' +
        event.city +
        ' ' +
        event.venue
      ).toLowerCase();

      return haystack.includes(q);
    });
  }, [events, query, activeCategory]);

  const renderCategoryChip = (key: CategoryKey) => {
    const isActive = activeCategory === key;

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.categoryChip,
          isActive && styles.categoryChipActive,
        ]}
        onPress={() => setActiveCategory(key)}
      >
        <Text
          style={[
            styles.categoryChipText,
            isActive && styles.categoryChipTextActive,
          ]}
        >
          {t(`search.categories.${key}`)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={t('search.title')} showBack={false} />
      <View style={[styles.content, { paddingBottom: insets.bottom + 8 }]}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#9ca3af"
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('search.inputPlaceholder')}
            placeholderTextColor="#6b7280"
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.clearBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoriesTitle}>
            {t('search.categoriesTitle')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORY_ORDER.map(renderCategoryChip)}
          </ScrollView>
        </View>

        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <EventCard event={item} index={index} onPress={() => onPressEvent(item)} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>{t('search.empty')}</Text>
          }
        />
      </View>
    </View>
  );
}

