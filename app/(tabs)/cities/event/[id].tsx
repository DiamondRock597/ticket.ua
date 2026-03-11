import { useLocalSearchParams } from 'expo-router';
import { EventPageScreen } from '@/src/screens/EventPageScreen';

export default function CitiesEventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <EventPageScreen eventId={id ?? ''} />;
}
