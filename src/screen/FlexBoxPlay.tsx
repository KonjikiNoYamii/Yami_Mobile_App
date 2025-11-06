import React, { useState } from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/FlexStyles';
import { FlexBoxArea } from '../components/FlexBoxArea';
import { FlexControls } from '../components/FlexBoxControls';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FlexboxPlay() {
  const [flexDirection, setFlexDirection] = useState<'row' | 'column' | 'row-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between'>('flex-start');
  const [alignItems, setAlignItems] = useState<'flex-start' | 'center' | 'stretch'>('flex-start');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎨 Flexbox Playground</Text>

      <FlexBoxArea
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
      />

      <FlexControls
        setFlexDirection={setFlexDirection}
        setJustifyContent={setJustifyContent}
        setAlignItems={setAlignItems}
      />
    </SafeAreaView>
  );
}
