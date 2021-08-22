import * as React from "react";

import { View, FlatList, StyleSheet } from "react-native";

import ListHeaderComponent from "./ListHeaderComponent";
import ListFooterComponent from "./ListFooterComponent";
import NoteItem from "./NoteItem";

const { useState } = React;

const NoteList = ({ data, isRemove, setIsRemove, onDelete, onPin }) => {
  const [selectedNotes, setSelectedNotes] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.contentContainerStyle,
            isRemove && { paddingBottom: 20 },
          ]}
          ListHeaderComponentStyle={styles.listHeaderComponentStyle}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <ListHeaderComponent
              data={data}
              isRemove={isRemove}
              setIsRemove={setIsRemove}
              selectedNotes={selectedNotes}
              setSelectedNotes={setSelectedNotes}
            />
          }
          renderItem={({ item }) => (
            <NoteItem
              isRemove={isRemove}
              setIsRemove={setIsRemove}
              selectedNotes={selectedNotes}
              setSelectedNotes={setSelectedNotes}
              item={item}
            />
          )}
        />
      </View>
      {isRemove && (
        <View style={styles.listFooterStyle}>
          <ListFooterComponent
            data={data}
            isRemove={isRemove}
            setIsRemove={setIsRemove}
            selectedNotes={selectedNotes}
            setSelectedNotes={setSelectedNotes}
            onDelete={onDelete}
            onPin={onPin}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listFooterStyle: {
    flex: 0.1,
    justifyContent: "flex-end",
  },
  contentContainerStyle: { flexGrow: 1 },
  listHeaderComponentStyle: {
    paddingVertical: 5,
    backgroundColor: "#897853",
  },
});

export default NoteList;
