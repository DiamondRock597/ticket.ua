import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectCities, setFilters } from '@/src/store/eventsSlice';

export function useCityScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);

  const handleCityPress = useCallback(
    (city: string) => {
      dispatch(setFilters({ city }));
      router.push('/search');
    },
    [dispatch, router]
  );

  return { cities, handleCityPress };
}
