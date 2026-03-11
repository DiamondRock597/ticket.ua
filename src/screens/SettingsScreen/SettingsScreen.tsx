import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { setSavedLanguage } from '@/src/i18n';
import { styles } from './styles';

const LANGUAGES = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
] as const;

export function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const current = i18n.language?.startsWith('uk') ? 'uk' : 'en';

  const handleSelect = async (code: 'uk' | 'en') => {
    await setSavedLanguage(code);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(400).springify()}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Text style={styles.sectionLabel}>{t('settings.language')}</Text>
        {LANGUAGES.map((lang) => {
          const isActive = current === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.languageOption, isActive && styles.languageOptionActive]}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.languageOptionText, isActive && styles.languageOptionTextActive]}>
                  {lang.label}
                </Text>
                {isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#6366f1"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </ScrollView>
  );
}
