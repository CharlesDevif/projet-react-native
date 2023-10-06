import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import AppContext from "../../context/index";

export default () => {
  const { currentBoard, currentTask } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode d'édition
  const [editedText, setEditedText] = useState(currentTask.name); // État pour stocker le texte modifié
  const [backgroundImage, setBackgroundImage] = useState(null);

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
          <TouchableOpacity>
            <Text style={styles.Text}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../assets/imgs/BurgerMenu.png")} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.AddBackground}>
          <Image source={require("../../assets/imgs/BurgerMenu.png")} />
          <Text style={styles.Text}>Couverture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerEditText}>
        <View style={styles.editTextName}>
          {isEditing ? ( // Affiche le champ de texte si isEditing est vrai
            <TextInput
              style={styles.editTextInput}
              value={editedText}  
              multiline={true}
              onChangeText={(text) => setEditedText(text)}
              onBlur={() => {
                setIsEditing(false);
                // Ici, tu peux enregistrer le texte modifié dans currentTask
                // par exemple : currentBoard.updateTask(currentTask.id, { name: editedText });
              }}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={[styles.taskText, styles.Text]}>{editedText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AddBackground: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  containerEditText: {
    backgroundColor: "#171b1e",
    
    height: "80%",
  },
  editTextName:{
    width:"90%"
  },
  editTextInput: {
    color: "#fcfcfc",
    padding: 18,
  },
  taskText: {
    padding: 18,
    backgroundColor: "red",
  },
  Text: {
    color: "#fcfcfc",
  },
});
