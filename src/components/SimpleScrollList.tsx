// src/components/ElegantScrollList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Style } from '../styles/style';

interface Props { items: string[]; }

export const SimpleScrollList: React.FC<Props> = ({ items }) => (
  <View style={Style.sectionWrap}>
    <Text style={Style.sectionTitle}>Overview</Text>
    {items.map((it, idx) => (
      <View key={idx} style={Style.row}>
        <Text style={Style.rowText}>{it}</Text>
      </View>
    ))}
  </View>
);
