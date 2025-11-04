// src/components/ElegantFlatList.tsx
import React, { useRef } from 'react';
import { FlatList, View, Text, RefreshControl } from 'react-native';
import { Style } from '../styles/style';

interface Item { id: string; title: string; }
interface Props {
  data: Item[];
  refreshing: boolean;
  onRefresh: () => void;
}

export const SimpleFlatList: React.FC<Props> = ({ data, refreshing, onRefresh }) => {
  const getItemLayout = (_: any, index: number) => ({ length: 56, offset: 56 * index, index });
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    // minimal notification — tidak pakai alert agar elegan
  }).current;

  return (
    <FlatList
      style={{ width: '100%' }}
      data={data}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={Style.listItem}>
          <Text style={Style.listItemText}>{item.title}</Text>
        </View>
      )}
      getItemLayout={getItemLayout}
      initialNumToRender={8}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />}
      ListHeaderComponent={<Text style={Style.listHeader}>Records</Text>}
      ListFooterComponent={<Text style={Style.listFooter}>End of Records</Text>}
      ItemSeparatorComponent={() => <View style={Style.separator} />}
    />
  );
};
