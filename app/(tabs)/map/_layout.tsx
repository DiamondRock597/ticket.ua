import { Stack } from 'expo-router';

export default function CitiesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0f0f12' },
        animation: 'slide_from_right',
      }}
    />
  );
}
