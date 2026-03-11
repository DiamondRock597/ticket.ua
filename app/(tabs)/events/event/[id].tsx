import { useLocalSearchParams } from 'expo-router';
import { EventPageScreen } from '@/src/screens/EventPageScreen';

export default function EventsEventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <EventPageScreen eventId={id ?? ''} />;
}
