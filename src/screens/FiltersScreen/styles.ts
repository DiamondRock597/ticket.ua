import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  content: {
    padding: 20,
    paddingTop: 56,
    paddingBottom: 40,
  },
  contentModal: {
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  block: {
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1f',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a30',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1a1a1f',
    borderWidth: 1,
    borderColor: '#2a2a30',
  },
  chipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  chipText: {
    fontSize: 14,
    color: '#aaa',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#1a1a1f',
    borderWidth: 1,
    borderColor: '#2a2a30',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  applyBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#6366f1',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
