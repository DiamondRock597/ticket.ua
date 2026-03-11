import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useAppSelector } from '@/src/store/hooks';
import { selectEventById } from '@/src/store/eventsSlice';

export function useEventPageScreen(eventId: string) {
  const event = useAppSelector(selectEventById(eventId));

  const openTickets = useCallback(() => {
    if (event?.ticket_url) Linking.openURL(event.ticket_url);
  }, [event?.ticket_url]);

  const openRoute = useCallback(() => {
    if (!event) return;

    const query = encodeURIComponent(`${event.city} ${event.venue}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

    Linking.openURL(url);
  }, [event]);

  return { event, openTickets, openRoute };
}
