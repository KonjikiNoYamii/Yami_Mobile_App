// src/components/ElegantSectionList.tsx
import React from 'react';
import { SectionList, View, Text, RefreshControl } from 'react-native';
import { Style } from '../styles/style';

interface SectionData { title: string; data: string[]; }
interface Props {
  sections: SectionData[];
  refreshing: boolean;
  onRefresh: () => void;
}

export const SimpleSectionList: React.FC<Props> = ({ sections, refreshing, onRefresh }) => (
  <View style={Style.sectionWrap}>
    <Text style={Style.sectionTitle}>Grouped</Text>
    <SectionList
      sections={sections}
      keyExtractor={(item, idx) => item + idx}
      renderItem={({ item }) => (
        <View style={Style.sectionItem}>
          <Text style={Style.sectionItemText}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={Style.sectionHeader}>
          <Text style={Style.sectionHeaderText}>{section.title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />}
      ItemSeparatorComponent={() => <View style={Style.smallSeparator} />}
    />
  </View>
);
