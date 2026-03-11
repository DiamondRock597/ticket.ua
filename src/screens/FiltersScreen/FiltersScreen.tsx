import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFiltersScreen } from './useFiltersScreen';
import { styles } from './styles';

type Props = {
  onApply?: () => void;
  variant?: 'screen' | 'modal';
};

export function FiltersScreen({ onApply, variant = 'screen' }: Props) {
  const { t } = useTranslation();
  const {
    cities,
    search,
    setSearch,
    localCity,
    setLocalCity,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    apply,
    reset,
  } = useFiltersScreen(onApply);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, variant === 'modal' && styles.contentModal]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {variant !== 'modal' && <Text style={styles.title}>{t('filters.title')}</Text>}

      <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.block}>
        <Text style={styles.label}>{t('filters.search')}</Text>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder={t('filters.searchPlaceholder')}
          placeholderTextColor="#555"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(50).springify()} style={styles.block}>
        <Text style={styles.label}>{t('filters.city')}</Text>
        <View style={styles.chips}>
          <TouchableOpacity
            style={[styles.chip, !localCity && styles.chipActive]}
            onPress={() => setLocalCity(null)}
          >
            <Text style={[styles.chipText, !localCity && styles.chipTextActive]}>
              {t('filters.all')}
            </Text>
          </TouchableOpacity>
          {cities.map((city: string) => (
            <TouchableOpacity
              key={city}
              style={[styles.chip, localCity === city && styles.chipActive]}
              onPress={() => setLocalCity(city)}
            >
              <Text
                style={[styles.chipText, localCity === city && styles.chipTextActive]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.block}>
        <Text style={styles.label}>{t('filters.dateFrom')}</Text>
        <TextInput
          style={styles.input}
          value={dateFrom}
          onChangeText={setDateFrom}
          placeholder={t('filters.datePlaceholder')}
          placeholderTextColor="#555"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.block}>
        <Text style={styles.label}>{t('filters.dateTo')}</Text>
        <TextInput
          style={styles.input}
          value={dateTo}
          onChangeText={setDateTo}
          placeholder={t('filters.datePlaceholder')}
          placeholderTextColor="#555"
        />
      </Animated.View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.resetBtn} onPress={reset}>
          <Text style={styles.resetText}>{t('filters.reset')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={apply}>
          <Text style={styles.applyText}>{t('filters.apply')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
