import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import { useAppSelector } from '@/src/store/hooks';
import { selectEvents } from '@/src/store/eventsSlice';
import type { Event } from '@/src/types/event';
import { HeaderBar } from '@/src/components/HeaderBar';

import { styles } from './styles';

type LatLng = {
  latitude: number;
  longitude: number;
};

const getCategoryIcon = (category: Event['category']): keyof typeof Ionicons.glyphMap => {
  switch (category) {
    case 'music':
      return 'musical-notes';
    case 'business':
      return 'briefcase';
    case 'theatre':
      return 'color-palette';
    default:
      return 'calendar';
  }
};

const INITIAL_REGION: Region = {
  latitude: 49.0,
  longitude: 31.0,
  latitudeDelta: 6,
  longitudeDelta: 6,
};

export function MapScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const events = useAppSelector(selectEvents);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [eventsWithCoords, setEventsWithCoords] = useState<
    { event: Event; coords: LatLng }[]
  >([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== Location.PermissionStatus.GRANTED) {
          if (!cancelled) {
            setPermissionDenied(true);
            setLoadingLocation(false);
          }
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!cancelled) {
          const coords = {
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
          };
          setUserLocation(coords);
          setRegion((prev) => ({
            ...prev,
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }));
          setLoadingLocation(false);
        }
      } catch {
        if (!cancelled) {
          setLoadingLocation(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const results: { event: Event; coords: LatLng }[] = [];

      for (const event of events as Event[]) {
        if (!event.address) continue;

        try {
          const geocoded = await Location.geocodeAsync(
            `${event.address}, ${event.city}`
          );

          if (!geocoded.length) continue;

          const { latitude, longitude } = geocoded[0];
          results.push({
            event,
            coords: { latitude, longitude },
          });
        } catch {
          // ignore geocoding errors for individual events
        }
      }

      if (!cancelled) {
        setEventsWithCoords(results);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [events]);

  const handleCenterOnUser = useCallback(() => {
    if (!userLocation) return;
    setRegion((prev) => ({
      ...prev,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    }));
  }, [userLocation]);

  const handleMarkerPress = useCallback(
    (event: Event) => {
      router.push(`/map/event/${event.id}`);
    },
    [router]
  );

  return (
    <View style={styles.screen}>
      <HeaderBar title={t('map.title')} showBack={false} />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title={t('map.you')}
              pinColor="#22c55e"
            />
          )}

          {eventsWithCoords.map(({ event, coords }) =>
            coords ? (
              <Marker
                key={event.id}
                coordinate={coords}
                onPress={() => handleMarkerPress(event)}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.markerBubble}>
                    <Ionicons
                      name={getCategoryIcon(event.category)}
                      size={16}
                      color="#e5e7eb"
                    />
                    <View style={styles.markerTextWrapper}>
                      <Text style={styles.markerTitle} numberOfLines={1}>
                        {event.title}
                      </Text>
                      <Text style={styles.markerSubtitle} numberOfLines={1}>
                        {event.city} • {event.address ?? event.venue}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.markerPointer} />
                </View>
              </Marker>
            ) : null
          )}
        </MapView>

        <View style={styles.overlay}>
          <View style={styles.overlayRow}>
            <View style={styles.badge}>
              <Ionicons name="location" size={14} color="#22c55e" />
              <Text style={styles.badgeText}>
                {permissionDenied
                  ? t('map.locationDenied')
                  : t('map.locationInfo')}
              </Text>
            </View>
            {loadingLocation && !permissionDenied && (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#9ca3af" />
                <Text style={styles.loadingText}>{t('map.loadingLocation')}</Text>
              </View>
            )}
          </View>

          <View style={styles.overlayRowBottom}>
            <TouchableOpacity
              style={[
                styles.fab,
                !userLocation || permissionDenied ? styles.fabDisabled : null,
              ]}
              onPress={handleCenterOnUser}
              activeOpacity={0.85}
              disabled={!userLocation || permissionDenied}
            >
              <Ionicons
                name="navigate"
                size={18}
                color={permissionDenied ? '#6b7280' : '#e5e7eb'}
              />
              <Text style={styles.fabText}>{t('map.centerOnMe')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

