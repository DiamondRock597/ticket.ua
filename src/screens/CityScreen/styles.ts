import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 28,
  },
  logo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: '#6366f1',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    letterSpacing: 0.2,
  },
  topSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  topScroll: {
    paddingRight: 20,
  },
  topCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a1f',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  topCardImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#2a2a30',
  },
  topCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  topCardContent: {
    padding: 14,
  },
  topCardDate: {
    fontSize: 12,
    color: '#6366f1',
    marginBottom: 4,
  },
  topCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  topCardVenue: {
    fontSize: 13,
    color: '#888',
  },
  list: {
    paddingBottom: 24,
  },
});
