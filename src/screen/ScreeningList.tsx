// src/screens/Day4Elegant.tsx
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { SimpleSectionList } from '../components/SimpleSectionList';
import { SimpleScrollList } from '../components/SimpleScrollList';
import { SimpleFlatList } from '../components/SimpleFlatList';
import { useData } from '../hooks/useData';
import { Style } from '../styles/style';


export default function ScreeningList() {
  const { refreshing, scrollItems, flatData, sections, onRefresh } = useData();

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.headerWrap}>
        <Text style={Style.title}>Day 4 — Lists (Elegant)</Text>
        <Text style={Style.subtitle}>Monochrome UI · No gradients</Text>
      </View>

      {/* NON-VIRTUALIZED summary area — safe to use ScrollView if needed,
          here we show a small static area instead to avoid nesting issues */}
      <SimpleScrollList items={scrollItems} />

      {/* Virtualized lists are independent (not nested inside a ScrollView) */}
      <SimpleFlatList data={flatData} refreshing={refreshing} onRefresh={onRefresh} />
      <SimpleSectionList sections={sections} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  );
}
