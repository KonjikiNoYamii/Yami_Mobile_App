import React from "react";
import { Image, FlatList, StyleSheet, View } from "react-native";

export default function PhotoPreviewList({ photos }: { photos: { uri: string; fileName: string }[] }) {
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.photo} resizeMode="cover" />
        )}
        ListEmptyComponent={
          <View style={styles.emptyPhoto} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  emptyPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
});
