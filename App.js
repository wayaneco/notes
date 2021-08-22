import * as React from "react";
import moment from "moment";
import { StatusBar } from "expo-status-bar";

import Icon from "react-native-vector-icons/Feather";

import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-elements";

import IonicIcon from "react-native-vector-icons/Ionicons";

import ModalScreen from "./components/ModalScreen";
import NoteList from "./components/NoteList";

const { useState } = React;
export default function App() {
  const [notes, setNotes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const handleNoteSave = (data) => {
    setNotes([...notes, data]);
  };

  const handleDeleteNote = (ids) => {
    const filteredNotes = notes?.filter((note) => !ids?.includes(note?.id));
    setNotes(filteredNotes);
  };

  const handlePinNote = (ids) => {
    const updatedNotes = [];
    notes.forEach((note) => {
      updatedNotes.push({
        ...note,
        isPinned: ids?.includes(note?.id)
          ? note?.isPinned
            ? false
            : true
          : note?.isPinned,
        modifyDate: ids?.includes(note?.id) ? moment() : note?.modifyDate,
      });
    });
    updatedNotes?.sort((a, b) => {
      if (a?.isPinned && a?.modifyDate?.valueOf() > b?.modifyDate?.valueOf()) {
        return -1;
      } else if (
        !a?.isPinned &&
        a?.createdDate?.valueOf() > b?.createdDate?.valueOf()
      ) {
        return 0;
      } else {
        return 1;
      }
    });
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.screenStyle}>
      <StatusBar style="auto" />

      {notes?.length ? (
        <NoteList
          data={notes}
          isRemove={isRemove}
          setIsRemove={setIsRemove}
          onDelete={handleDeleteNote}
          onPin={handlePinNote}
        />
      ) : (
        <View style={styles.emptyListContainerStyle}>
          <IonicIcon
            name="reader-outline"
            color="#F8F4E1"
            size={80}
            style={styles.removeIcon}
          />
          <Text style={styles.emplyListTextStyle}>Empty notes</Text>
        </View>
      )}

      <ModalScreen
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        onSave={handleNoteSave}
      />

      {!isRemove && (
        <FAB
          color="#4E3620"
          placement="right"
          icon={<Icon name="plus" color="#F8F4E1" size={26} />}
          onPress={() => setIsVisible(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    paddingTop: 30,
    height: "100%",
    backgroundColor: "#897853",
  },
  emptyListContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 100,
  },
  emplyListTextStyle: { fontSize: 14, color: "#F8F4E1" },
});
