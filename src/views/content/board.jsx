import { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import AppContext from "../../context";
import ColumnCard from "../../components/content/Column";
import HeaderNav from "../../components/layout/HeaderNav";
import Button from "../../components/layout/Button";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const { currentBoard } = useContext(AppContext);
  const [inputCreateColumn, setInputCreateColumn] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();


  

  function createColonne() {
    if (inputCreateColumn) {
      // Ajoute la colonne avec le nom contenu dans "columnName"
      currentBoard.createColumn(columnName);
      // Réinitialise le nom de la colonne et cache l'input
      setColumnName("");
      setInputCreateColumn(false);
    } else {
      setInputCreateColumn(true); // Affiche l'input texte
    }
  }

  function deleteBoard() {
    currentBoard.delete()
    navigation.goBack()
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeaderNav modalVisible={modalVisible} setModalVisible={setModalVisible} currentBoard={currentBoard} />
      <ScrollView
        style={styles.scrollConteneur}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {currentBoard &&
          currentBoard.columns.map((col, index) => (
            <ColumnCard
              currentBoard={currentBoard}
              key={index}
              column={col}
            ></ColumnCard>
          ))}
        <TouchableOpacity onPress={createColonne} style={styles.addCard}>
          {inputCreateColumn ? (
            <View style={styles.containerAddColumn}>
              <TextInput
                style={styles.input}
                placeholder="Nom de la colonne"
                value={columnName}
                onChangeText={(text) => setColumnName(text)}
                onBlur={createColonne} 
                onSubmitEditing={createColonne} 
                autoFocus
              />
              <Image
                style={styles.imageSend}
                source={require("../../assets/imgs/ValidateBlue.png")}
              />
            </View>
          ) : (
            <Text style={styles.textAddColumn}>Ajouter une liste</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {modalVisible ? (
        <View style={styles.modaleContainer}>
          <View style={styles.modalStyle}>
            <Text onPress={deleteBoard} style={styles.modalText}>Supprimer {currentBoard.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalText}>Fermer la modale</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollConteneur: {
    backgroundColor: "#25a7ef",
    paddingTop: 24,
    width: "100%",
  },
  addCard: {
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    marginRight: 16,
    backgroundColor: "#000000",
    borderRadius: 8,
  },
  textAddColumn: {
    color: "#699dff",
    fontSize: 16,
    fontWeight: "400",
  },
  containerAddColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 16,
    borderColor: "#699dff",
    borderBottomWidth: 2,
    color: "#fcfcfc",
  },
  imageSend: {
    width: 15,
    height: 15,
  },
  modaleContainer: {
    position: "absolute",
    top:0,
    right: 0,
    width: "100%",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalStyle: {
    backgroundColor: "#171b1e",
    width: "80%",
    justifyContent: "space-around",
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 32,
    color: "#fcfcfc",
  },
});
