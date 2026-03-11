import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { selectCities } from '@/src/store/eventsSlice';

export function useCityScreen() {
  const router = useRouter();
  const cities = useAppSelector(selectCities);

  const handleCityPress = useCallback(
    (city: string) => {
      router.push({ pathname: '/cities/event-list', params: { city } });
    },
    [router]
  );

  return { cities, handleCityPress };
}
