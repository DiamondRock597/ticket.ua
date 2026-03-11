import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
    paddingHorizontal: 20,
  },
  filterBtn: {
    padding: 8,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 48,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f0f12',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a30',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  modalClose: {
    padding: 4,
  },
});
