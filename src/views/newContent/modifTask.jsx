import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppContext from "../../context/index";

export default () => {
  const { currentBoard, currentTask, currentColumn } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode d'édition
  const [editedText, setEditedText] = useState(currentTask.name); // État pour stocker le texte modifié

  function updateName() {
    setIsEditing(false);
    currentTask.name = editedText;
    currentBoard.save();
  }

  return (
    <View style={styles.containerImageBackground}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: "black", // Définis la couleur de fond en noir
          },
        ]}
      >
        <View style={styles.headerMenu}>
         
            <Text style={[styles.Text, styles.textSize]}>X</Text>
         
         
            <Image source={require("../../assets/imgs/BurgerMenu.png")} />
         
        </View>
        
          <View style={styles.AddBackground}>
            <Image source={require("../../assets/imgs/AddImage.png")} />
            <Text style={[styles.Text, styles.textSize]}>Couverture</Text>
          </View>
       
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (isEditing) {
            setIsEditing(false);
            updateName(); // Enregistre les modifications
          }
        }}
      >
        <View style={styles.containerEditText}>
          <View style={styles.editTextName}>
            {isEditing ? ( // Affiche le champ de texte si isEditing est vrai
              <TextInput
                style={styles.editTextInput}
                value={editedText}
                onChangeText={(text) => setEditedText(text)}
                multiline={true} // Permet le passage à la ligne
                autoFocus
              />
            ) : (
              <TouchableWithoutFeedback
                onPress={() => setIsEditing(true)}
                onBlur={() => {
                  if (isEditing) {
                    setIsEditing(false);
                    updateName(); // Enregistre les modifications
                  }
                }}
              >
                <Text style={[styles.taskText, styles.Text]}>{editedText}</Text>
              </TouchableWithoutFeedback>
            )}

            <View style={styles.containerEmplacement}>
              <Text style={[styles.Text, styles.TextBold, styles.textSize]}>
                {currentBoard.name}{" "}
              </Text>
              <Text style={[styles.Text, styles.textSize]}>
                {" "}
                dans la colonne{" "}
              </Text>
              <Text style={[styles.Text, styles.TextBold, styles.textSize]}>
                {" "}
                {currentColumn.name}{" "}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImageBackground: {
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    height: "20%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerMenu: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AddBackground: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor:'#171b1e'
  },
  containerEditText: {
    backgroundColor: "#171b1e",
    height: "80%",
  },
  editTextName: {
    width: "90%",
  },
  editTextInput: {
    fontSize: 30,
    color: "#fcfcfc",
    padding: 22,
  },
  taskText: {
    padding: 22,
    fontSize: 30,
  },
  containerEmplacement: {
    paddingLeft: 22,
    flexDirection: "row",
  },
  TextBold: {
    fontWeight: "700",
    fontStyle: "italic",
  },
  textSize: {
    fontSize: 17,
  },
  Text: {
    color: "#fcfcfc",
  },
});
