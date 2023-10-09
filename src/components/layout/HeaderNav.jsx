import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";

export default function HeaderNav({ currentBoard, setModalVisible, modalVisible }) {
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const [boardName, setBoardName] = useState(currentBoard.name);


  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  function handleEditBoardName() {
    if (isEditingBoardName) {
      if (boardName.trim() !== "") {
       
        currentBoard.name = boardName;
        currentBoard.save();
      } else {
       
      }
      setBoardName("");
      setIsEditingBoardName(false);
    } else {
      setIsEditingBoardName(true);
    }
  }

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={handleEditBoardName}>
        {isEditingBoardName ? (
          <View style={styles.containerEditBoardName}>
            <TextInput
              style={styles.input}
              placeholder="Nom du tableau"
              value={currentBoard.name}
              onChangeText={(text) => setBoardName(text)}
              autoFocus
              onBlur={handleEditBoardName}
              onSubmitEditing={handleEditBoardName}
            />
            <Image style={styles.imageSend} source={require("../../assets/imgs/ValidateBlue.png")} />
          </View>
        ) : (
          <Text style={styles.textHeader}>{currentBoard.name}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoneClic} onPress={openModal}>
        <Image source={require('../../assets/imgs/BurgerMenu.png')} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#18538c"
  },
  zoneClic: {
    padding: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fcfcfc"
  },
  containerEditBoardName: {
    width: 200,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    color: "#fcfcfc" // Couleur du texte de l'input
  },
  imageSend: {
    width: 24,
    height: 24
  },

});
