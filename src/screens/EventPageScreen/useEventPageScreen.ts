import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useAppSelector } from '@/src/store/hooks';
import { selectEventById } from '@/src/store/eventsSlice';

export function useEventPageScreen(eventId: string) {
  const event = useAppSelector(selectEventById(eventId));

  const openTickets = useCallback(() => {
    if (event?.ticket_url) Linking.openURL(event.ticket_url);
  }, [event?.ticket_url]);

  return { event, openTickets };
}
