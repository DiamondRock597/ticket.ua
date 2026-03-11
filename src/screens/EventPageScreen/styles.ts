import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  content: {
    paddingBottom: 120,
  },
  imageWrap: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#2a2a30',
  },
  body: {
    padding: 20,
    paddingTop: 8,
  },
  city: {
    fontSize: 14,
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  date: {
    fontSize: 15,
    color: '#aaa',
    marginBottom: 20,
  },
  venueLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  venue: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  descLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#bbb',
    lineHeight: 22,
    marginBottom: 16,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#0f0f12',
  },
  bottomBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272f',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#e5e7eb',
  },
  error: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 48,
  },
});
