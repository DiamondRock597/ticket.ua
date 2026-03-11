import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import i18n, { getSavedLanguage } from '@/src/i18n';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/src/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    getSavedLanguage().then((saved) => {
      if (saved) i18n.changeLanguage(saved);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f0f12' },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </Provider>
  );
}
