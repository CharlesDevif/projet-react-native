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

export default () => {
  const { currentBoard } = useContext(AppContext);

  const [inputCreateColumn, setInputCreateColumn] = useState(false);
  const [columnName, setColumnName] = useState("");

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
    console.log(currentBoard);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeaderNav currentBoard={currentBoard} />
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
});
