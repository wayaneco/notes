import * as React from "react";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import IonicIcons from "react-native-vector-icons/Ionicons";

const NoteItem = ({
  item,
  isRemove,
  setIsRemove,
  selectedNotes,
  setSelectedNotes,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={() => {
        setSelectedNotes([...selectedNotes, item?.id]);
        setIsRemove(true);
      }}
      onPress={() => {
        if (isRemove) {
          const isAlreadySelected = selectedNotes?.includes(item?.id);

          setSelectedNotes(
            isAlreadySelected
              ? selectedNotes?.filter((selectedId) => selectedId !== item?.id)
              : [...selectedNotes, item?.id]
          );
        }
      }}
    >
      <View style={styles.noteContainer}>
        <View style={styles.contentWrapper}>
          {item.title ? (
            <Text style={styles.titleStyle} numberOfLines={1}>
              {item.title}
            </Text>
          ) : null}
          {item.content ? (
            <Text
              style={!item?.title ? styles.titleStyle : styles.contentStyle}
              numberOfLines={1}
            >
              {item.content}
            </Text>
          ) : null}
          <View style={styles.dateContainer}>
            <Text style={styles.dateStyle}>{item?.createdDate.calendar()}</Text>
            {item?.isPinned && (
              <Icon name="arrow-up" color="#4E3620" size={14} />
            )}
          </View>
        </View>

        {isRemove && (
          <View style={styles.removeOptionContainer}>
            {selectedNotes?.includes(item?.id) ? (
              <Icon
                name="check-circle"
                color="#897853"
                size={26}
                style={styles.removeIcon}
              />
            ) : (
              <Icon
                name="circle"
                color="#897853"
                size={26}
                style={styles.removeIcon}
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 0.7,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: "#897853",
    backgroundColor: "#F8F4E1",
    flexDirection: "row",
  },
  contentWrapper: { flex: 1 },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentStyle: {
    fontSize: 15,
    marginBottom: 4,
  },
  dateContainer: { flexDirection: "row", alignItems: "center" },
  dateStyle: { fontSize: 12.5, marginRight: 5 },
  removeOptionContainer: { justifyContent: "center", alignItems: "center" },
  removeIcon: { padding: 5 },
});

export default NoteItem;
