// src/styles/elegantStyle.ts
import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // putih bersih
    alignItems: 'center',
  },

  headerWrap: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a0a0a', // hitam pekat
  },
  subtitle: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
  },

  // Section / Overview
  sectionWrap: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#0a0a0a',
    fontWeight: '600',
    marginBottom: 8,
  },

  row: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowText: { color: '#111111', fontSize: 14 },

  // FlatList
  listHeader: {
    fontSize: 14,
    color: '#0a0a0a',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listFooter: {
    fontSize: 12,
    color: '#666666',
    paddingVertical: 12,
    textAlign: 'center',
  },
  listItem: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  listItemText: { color: '#111111', fontSize: 15 },

  separator: { height: 1, backgroundColor: '#f3f3f3' },
  smallSeparator: { height: 8 },

  // SectionList
  sectionHeader: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
  },
  sectionHeaderText: {
    color: '#0a0a0a',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionItemText: { color: '#222222', fontSize: 14 },

  // small utilities
  ending: { paddingVertical: 20, color: '#444444' },
});
