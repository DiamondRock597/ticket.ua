import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAppSelector } from '@/src/store/hooks';
import { selectFilteredEvents } from '@/src/store/eventsSlice';
import type { Event } from '@/src/types/event';
import { HeaderBar } from '@/src/components/HeaderBar';
import { EventCard } from '@/src/screens/EventListScreen/components/EventCard';
import { FiltersScreen } from '@/src/screens/FiltersScreen/FiltersScreen';

import { styles } from './styles';

type CategoryKey = 'all' | 'music' | 'business' | 'theatre';
type SortKey = 'dateAsc' | 'dateDesc';

const CATEGORY_ORDER: CategoryKey[] = ['all', 'music', 'business', 'theatre'];

export function SearchScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const events = useAppSelector(selectFilteredEvents);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('dateAsc');
  const [refreshing, setRefreshing] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const onPressEvent = useCallback(
    (event: Event) => {
      router.push(`/search/event/${event.id}`);
    },
    [router]
  );

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = events.filter((event) => {
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
        event.venue +
        ' ' +
        (event.address ?? '')
      ).toLowerCase();

      return haystack.includes(q);
    });

    return filtered
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        if (sortKey === 'dateAsc') {
          return dateA - dateB;
        }

        return dateB - dateA;
      });
  }, [events, query, activeCategory, sortKey]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const seen = new Set<string>();

    return events
      .filter((event) => {
        const haystack = (
          event.title +
          ' ' +
          event.description +
          ' ' +
          event.city +
          ' ' +
          event.venue +
          ' ' +
          (event.address ?? '')
        ).toLowerCase();

        return haystack.includes(q);
      })
      .filter((event) => {
        const key = `${event.title}-${event.city}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 6);
  }, [events, query]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // In a real app this is where you'd refetch events from an API
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  }, []);

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
      <HeaderBar
        title={t('search.title')}
        showBack={false}
        right={
          <TouchableOpacity
            onPress={() => setFiltersVisible(true)}
            style={styles.filterBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="options-outline" size={24} color="#fff" />
          </TouchableOpacity>
        }
      />
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

        {query.length > 0 && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.suggestionItem}
                onPress={() => setQuery(event.title)}
              >
                <Ionicons
                  name="search"
                  size={16}
                  color="#9ca3af"
                  style={styles.suggestionIcon}
                />
                <View style={styles.suggestionTextWrapper}>
                  <Text style={styles.suggestionTitle} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <Text style={styles.suggestionMeta} numberOfLines={1}>
                    {event.city} • {event.venue}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <Text style={styles.empty}>{t('search.empty')}</Text>
          }
        />
      </View>

      <Modal
        visible={filtersVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setFiltersVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalHeader, { paddingTop: insets.top + 8 }]}>
            <Text style={styles.modalTitle}>{t('filters.title')}</Text>
            <Pressable
              onPress={() => setFiltersVisible(false)}
              style={styles.modalClose}
              hitSlop={12}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </Pressable>
          </View>
          <FiltersScreen onApply={() => setFiltersVisible(false)} variant="modal" />
          <View style={styles.sortWrapper}>
            <Text style={styles.sortTitle}>{t('search.sortTitle')}</Text>
            <View style={styles.sortChipsRow}>
              <TouchableOpacity
                style={[
                  styles.sortChip,
                  sortKey === 'dateAsc' && styles.sortChipActive,
                ]}
                onPress={() => setSortKey('dateAsc')}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    sortKey === 'dateAsc' && styles.sortChipTextActive,
                  ]}
                >
                  {t('search.sort.dateAsc')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortChip,
                  sortKey === 'dateDesc' && styles.sortChipActive,
                ]}
                onPress={() => setSortKey('dateDesc')}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    sortKey === 'dateDesc' && styles.sortChipTextActive,
                  ]}
                >
                  {t('search.sort.dateDesc')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

