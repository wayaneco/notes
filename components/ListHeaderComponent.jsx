import * as React from "react";

import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";

const ListHeaderComponent = ({
  data,
  isRemove,
  selectedNotes,
  setSelectedNotes,
  setIsRemove,
}) => {
  return (
    <View>
      {isRemove ? (
        <View style={styles.removeOptionsContainer}>
          <Icon
            name="x"
            color="#F8F4E1"
            size={26}
            style={styles.iconStyle}
            onPress={() => {
              setSelectedNotes([]);
              setIsRemove(false);
            }}
          />
          <Text style={styles.textStyle}>
            {selectedNotes?.length
              ? `${selectedNotes?.length} item selected`
              : "Select Items"}
          </Text>
          <Icon
            name="list"
            color="#F8F4E1"
            size={26}
            style={styles.iconStyle}
            onPress={() => {
              const allNoteIds = data?.map(({ id }) => id);
              setSelectedNotes(allNoteIds);
            }}
          />
        </View>
      ) : (
        <View>
          <Icon
            name="settings"
            color="#F8F4E1"
            size={26}
            style={[styles.iconStyle, styles.settingStyle]}
            onPress={() => {
              const allNoteIds = data?.map(({ id }) => id);
              setSelectedNotes(allNoteIds);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  removeOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: { fontSize: 18, color: "#F8F4E1" },
  iconStyle: { padding: 10 },
  settingStyle: { alignSelf: "flex-end" },
});

export default ListHeaderComponent;
