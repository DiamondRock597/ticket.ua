import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#1a1a1f',
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: '#2a2a30',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  arrow: {
    opacity: 0.9,
  },
});
