import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/FlexStyles';
import { ControlButton } from './ControlButton';

interface FlexControlsProps {
  setFlexDirection: (dir: 'row' | 'column' | 'row-reverse') => void;
  setJustifyContent: (val: 'flex-start' | 'center' | 'space-between') => void;
  setAlignItems: (val: 'flex-start' | 'center' | 'stretch') => void;
}

export const FlexControls: React.FC<FlexControlsProps> = ({
  setFlexDirection,
  setJustifyContent,
  setAlignItems,
}) => {
  return (
    <View style={styles.controls}>
      <Text style={styles.sectionTitle}>Flex Direction</Text>
      <View style={styles.buttonRow}>
        <ControlButton label="Row" onPress={() => setFlexDirection('row')} />
        <ControlButton label="Column" onPress={() => setFlexDirection('column')} />
        <ControlButton label="Row-Reverse" onPress={() => setFlexDirection('row-reverse')} />
      </View>

      <Text style={styles.sectionTitle}>Justify Content</Text>
      <View style={styles.buttonRow}>
        <ControlButton label="Start" onPress={() => setJustifyContent('flex-start')} />
        <ControlButton label="Center" onPress={() => setJustifyContent('center')} />
        <ControlButton label="Between" onPress={() => setJustifyContent('space-between')} />
      </View>

      <Text style={styles.sectionTitle}>Align Items</Text>
      <View style={styles.buttonRow}>
        <ControlButton label="Start" onPress={() => setAlignItems('flex-start')} />
        <ControlButton label="Center" onPress={() => setAlignItems('center')} />
        <ControlButton label="Stretch" onPress={() => setAlignItems('stretch')} />
      </View>
    </View>
  );
};
