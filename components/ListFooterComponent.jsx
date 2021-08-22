import * as React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import IonicIcons from "react-native-vector-icons/Ionicons";

const ListFooterComponent = ({
  data,
  isRemove,
  setIsRemove,
  selectedNotes,
  setSelectedNotes,
  onDelete,
  onPin,
}) => {
  return (
    isRemove && (
      <View style={styles.removeContainerStyles}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            onPin(selectedNotes);
            setIsRemove(false);
            setSelectedNotes([]);
          }}
        >
          <View style={styles.iconTextContainerStyle}>
            <IonicIcons
              name="pin-outline"
              color="#F8F4E1"
              size={26}
              style={styles.iconStyle}
            />
            <Text style={styles.textStyle}>Pin</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            onDelete(selectedNotes);
            setIsRemove(false);
            setSelectedNotes([]);
          }}
        >
          <View style={styles.iconTextContainerStyle}>
            <IonicIcons
              name="trash-outline"
              color="#F8F4E1"
              size={26}
              style={styles.iconStyle}
            />
            <Text style={styles.textStyle}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  removeContainerStyles: {
    backgroundColor: "#4E3620",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconTextContainerStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    justifyContent: "space-between",
  },
  iconStyle: { padding: 10 },
  textStyle: { color: "#F8F4E1", fontSize: 12 },
});

export default ListFooterComponent;
