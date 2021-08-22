import * as React from "react";
import uuid from "react-native-uuid";
import moment from "moment";

import Icon from "react-native-vector-icons/Feather";

import { View, Modal, TextInput, StyleSheet } from "react-native";

const { useRef, useEffect, useState } = React;

const ModalScreen = ({ visible, onClose, onSave }) => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (visible) {
      titleRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    setIsValid(!!(title || content));
  }, [title, content]);

  const handleClose = () => {
    setTitle("");
    setContent("");
    setIsValid(false);
    onClose();
  };

  const handleSave = () => {
    const currentData = {
      id: uuid.v4(),
      title,
      content,
      createdDate: moment(),
      isSelected: false,
      modifyDate: moment(),
      isPinned: false,
    };

    onSave(currentData);
    setTitle("");
    setContent("");
    setIsValid(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          paddingTop: 20,
          backgroundColor: "#897853",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          height: 70,
        }}
      >
        <Icon
          name="corner-up-left"
          color="#F8F4E1"
          size={26}
          style={{ padding: 10 }}
          onPress={handleClose}
        />
        <View style={{ flexDirection: "row" }}>
          {isValid && (
            <Icon
              name="check"
              color="#F8F4E1"
              size={26}
              style={{ padding: 10 }}
              onPress={handleSave}
            />
          )}
        </View>
      </View>
      <View style={styles.containerStyle}>
        <TextInput
          style={styles.inputTitleStyle}
          placeholder="Title"
          selectionColor="#4E3620"
          ref={titleRef}
          value={title}
          onChangeText={(val) => setTitle(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Start typing"
          multiline={true}
          selectionColor="#4E3620"
          val={content}
          onChangeText={(val) => setContent(val)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  inputTitleStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    marginTop: 5,
  },
  inputStyle: {
    flex: 1,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
});

export default ModalScreen;
