import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter, useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { selectFilteredEvents } from '@/src/store/eventsSlice';
import type { Event } from '@/src/types/event';

export function useEventListScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { city: cityParam } = useLocalSearchParams<{ city?: string }>();
  const events = useAppSelector(selectFilteredEvents);

  const basePath = pathname.startsWith('/cities') ? '/cities' : '/events';

  const list = useMemo(
    () =>
      cityParam
        ? events.filter((e: Event) => e.city === cityParam)
        : events,
    [events, cityParam]
  );

  const headerTitle = cityParam
    ? t('events.byCity', { city: cityParam })
    : t('events.all');

  const isAllEvents = !cityParam;

  const handleEventPress = useCallback(
    (event: Event) => {
      router.push(`${basePath}/event/${event.id}`);
    },
    [router, basePath]
  );

  return { list, headerTitle, isAllEvents, handleEventPress };
}
