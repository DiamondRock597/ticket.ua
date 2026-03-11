import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1f',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a30',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#2a2a30',
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 13,
    color: '#6366f1',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  venue: {
    fontSize: 14,
    color: '#888',
    flex: 1,
  },
});
