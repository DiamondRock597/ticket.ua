import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n, { getSavedLanguage } from '@/src/i18n';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/src/store';
import { WithNewEventBottomSheet } from '@/src/components/NewEventBottomSheet';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    getSavedLanguage().then((saved) => {
      if (saved) i18n.changeLanguage(saved);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <WithNewEventBottomSheet>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#0f0f12' },
              }}
            >
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="light" />
          </WithNewEventBottomSheet>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
