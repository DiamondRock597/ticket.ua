import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  content: {
    padding: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1f',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a30',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 15,
    color: '#888',
    marginLeft: 12,
  },
  languageOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1f',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a30',
    marginBottom: 8,
  },
  languageOptionActive: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  languageOptionTextActive: {
    color: '#6366f1',
  },
});
