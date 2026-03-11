import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1a1a1f',
    borderWidth: 1,
    borderColor: '#2a2a30',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  clearBtn: {
    padding: 4,
    marginLeft: 4,
  },
  categoriesWrapper: {
    marginBottom: 12,
  },
  categoriesTitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 8,
  },
  categoriesScroll: {
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2a2a30',
    backgroundColor: '#14141a',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryChipText: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  categoryChipTextActive: {
    color: '#fff',
    fontWeight: '600',
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
  suggestionsContainer: {
    marginTop: -4,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#27272f',
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  suggestionIcon: {
    marginRight: 8,
  },
  suggestionTextWrapper: {
    flex: 1,
  },
  suggestionTitle: {
    color: '#e5e7eb',
    fontSize: 15,
  },
  suggestionMeta: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  sortWrapper: {
    marginBottom: 12,
  },
  sortTitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 6,
  },
  sortChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2a2a30',
    backgroundColor: '#14141a',
    marginRight: 8,
  },
  sortChipActive: {
    backgroundColor: '#111827',
    borderColor: '#6366f1',
  },
  sortChipText: {
    color: '#e5e7eb',
    fontSize: 13,
  },
  sortChipTextActive: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  filterBtn: {
    paddingHorizontal: 8,
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
    borderBottomColor: '#111827',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalClose: {
    padding: 4,
  },
});

