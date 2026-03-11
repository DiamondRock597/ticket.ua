import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tabBarStyle = {
  backgroundColor: '#0f0f12',
  borderTopColor: '#2a2a30',
};
const tabBarActiveTintColor = '#6366f1';
const tabBarInactiveTintColor = '#666';

function TabIcon({
  name,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) {
  return (
    <Ionicons
      name={name}
      size={22}
      color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor}
    />
  );
}

function TabLabel({
  label,
  focused,
}: {
  label: string;
  focused: boolean;
}) {
  return (
    <Text
      style={{
        color: focused ? tabBarActiveTintColor : tabBarInactiveTintColor,
        fontSize: 12,
      }}
    >
      {label}
    </Text>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabel: ({ children, focused }) => (
          <TabLabel label={String(children)} focused={focused} />
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="cities"
        options={{
          title: t('tabs.cities'),
          href: '/cities',
          tabBarIcon: ({ focused }) => <TabIcon name="location" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: t('tabs.events'),
          href: '/events',
          tabBarIcon: ({ focused }) => <TabIcon name="calendar" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('tabs.search'),
          href: '/search',
          tabBarIcon: ({ focused }) => <TabIcon name="search" focused={focused} />,
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          href: '/settings',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="calendar" focused={focused} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
