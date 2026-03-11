import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 24,
    justifyContent: 'space-between',
    pointerEvents: 'box-none',
  },
  overlayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,15,18,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#27272f',
  },
  badgeText: {
    marginLeft: 6,
    color: '#e5e7eb',
    fontSize: 13,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,15,18,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  loadingText: {
    marginLeft: 8,
    color: '#9ca3af',
    fontSize: 12,
  },
  overlayRowBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
  },
  fabDisabled: {
    opacity: 0.6,
  },
  fabText: {
    marginLeft: 6,
    color: '#e5e7eb',
    fontSize: 13,
    fontWeight: '500',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(15,15,22,0.96)',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  markerTextWrapper: {
    marginLeft: 8,
    maxWidth: 180,
  },
  markerTitle: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '600',
  },
  markerSubtitle: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 1,
  },
  markerPointer: {
    width: 0,
    height: 0,
    marginTop: 4,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(15,15,22,0.96)',
  },
});

