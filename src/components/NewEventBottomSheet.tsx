import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import events from '@/src/data/events.json';

export function WithNewEventBottomSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NewEventModal />
    </>
  );
}

function NewEventModal() {
  const router = useRouter();
  const NEW_EVENT =
    events[events.length - 1] ??
    ({
      id: 'preview',
      title: 'Новий івент скоро',
      city: 'Online',
      venue: 'TBA',
      description: 'Тестова модалка — дані івенту ще не завантажені.',
      image: null,
    } as any);

  const [visible, setVisible] = useState(false);
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(80), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    return () => clearTimeout(timer);
  }, [opacity, translateY]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.backdrop}>
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (NEW_EVENT.id) {
                handleClose();
                router.push(`/events/event/${NEW_EVENT.id}`);
              }
            }}
          >
            <LinearGradient
              colors={['#18181b', '#020617']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Новий івент</Text>
              </View>

              <Text style={styles.title} numberOfLines={2}>
                {NEW_EVENT.title}
              </Text>

              <Text style={styles.meta} numberOfLines={1}>
                {NEW_EVENT.city} • {NEW_EVENT.venue}
              </Text>

              {NEW_EVENT.image ? (
                <Image source={{ uri: NEW_EVENT.image }} style={styles.image} />
              ) : null}

              <Text style={styles.description} numberOfLines={4}>
                {NEW_EVENT.description}
              </Text>

              <View style={styles.actionsRow}>
                <View style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Детальніше</Text>
                </View>

                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.closeButtonText}>Закрити</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
  cardWrapper: {
    width: '90%',
    borderRadius: 32,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingVertical: 26,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.4)',
    marginBottom: 12,
  },
  badgeText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#f9fafb',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  meta: {
    color: '#9ca3af',
    fontSize: 15,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 24,
    marginBottom: 14,
  },
  description: {
    color: '#d1d5db',
    fontSize: 15,
    marginBottom: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  primaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#6366f1',
  },
  primaryButtonText: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '600',
  },
  closeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#111827',
  },
  closeButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
});

