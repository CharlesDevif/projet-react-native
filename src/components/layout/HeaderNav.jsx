import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";

export default function HeaderNav({ currentBoard }) {
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const [boardName, setBoardName] = useState(currentBoard.name);

  function deleteBoard() {
    currentBoard.delete().then(() => {
      // Mettez ici la logique pour gérer la suppression du tableau.
    });
  }

  function handleEditBoardName() {
    if (isEditingBoardName) {
      // Mettez ici la logique pour enregistrer le nouveau nom du tableau.
      currentBoard.name = boardName;
      currentBoard.save()
    }
    setIsEditingBoardName(!isEditingBoardName);
  }

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={handleEditBoardName}>
        {isEditingBoardName ? (
          <View style={styles.containerEditBoardName}>
            <TextInput
              style={styles.input}
              placeholder="Nom du tableau"
              value={boardName}
              onChangeText={(text) => setBoardName(text)}
              autoFocus
              onBlur={handleEditBoardName}
              onSubmitEditing={handleEditBoardName}
            />
            <Image style={styles.imageSend} source={require("../../assets/imgs/ValidateBlue.png")} />
          </View>
        ) : (
          <Text style={styles.textHeader}>{boardName}</Text>
        )}
      </TouchableOpacity>

      <Image source={require('../../assets/imgs/BurgerMenu.png')} />
      {/* Ajoutez un bouton pour supprimer le tableau si nécessaire */}
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
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fcfcfc"
  },
  containerEditBoardName: {
    width:200,
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
  }
});
