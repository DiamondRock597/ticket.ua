import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uk from './locales/uk.json';
import en from './locales/en.json';

const resources = {
  uk: { translation: uk },
  en: { translation: en },
};

const LANG_KEY = 'app_language';

const deviceLocale = 'uk';
const supportedLocale = deviceLocale.startsWith('uk') ? 'uk' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLocale,
  fallbackLng: 'uk',
  interpolation: {
    escapeValue: false,
  },
});

export async function getSavedLanguage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

export async function setSavedLanguage(lng: string): Promise<void> {
  try {
    await AsyncStorage.setItem(LANG_KEY, lng);
    await i18n.changeLanguage(lng);
  } catch {
    await i18n.changeLanguage(lng);
  }
}

export default i18n;
