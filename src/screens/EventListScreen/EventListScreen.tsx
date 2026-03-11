import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EventCard } from './components/EventCard';
import { FiltersScreen } from '@/src/screens/FiltersScreen/FiltersScreen';
import { HeaderBar } from '@/src/components/HeaderBar';
import { useEventListScreen } from './useEventListScreen';
import { styles } from './styles';

export function EventListScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { list, headerTitle, handleEventPress, isAllEvents } = useEventListScreen();
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderBar
        title={headerTitle}
        showBack={!isAllEvents}
        right={
          isAllEvents ? (
            <TouchableOpacity
              onPress={() => setFiltersVisible(true)}
              style={styles.filterBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="options-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ) : undefined
        }
      />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <EventCard
            event={item}
            index={index}
            onPress={() => handleEventPress(item)}
          />
        )}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>{t('events.empty')}</Text>
        }
      />

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
        </View>
      </Modal>
    </View>
  );
}
