import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AppContext from '../../context/index'

export default ({ currentBoard, column }) => {
  const { setCurrentTask } = useContext(AppContext);
  const [inputCreateCard, setInputCreateCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const navigation = useNavigation()

  function createCard() {
    if (inputCreateCard) {
      currentBoard.createTask(cardName, "", column);
      setCardName("");
      setInputCreateCard(false);
    } else {
      setInputCreateCard(true);
    }
  }

  function handelPress(task) {
    setCurrentTask(task)
    navigation.navigate("modifTask")

  }
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.containerCard}>
        <View style={styles.headerCollum}>
          <Text style={styles.text}>{column.name}</Text>
          <TouchableOpacity>
            <Image source={require("../../assets/imgs/BurgerMenu.png")} />
          </TouchableOpacity>
        </View>

        {column
          ? column.tasks.map((task, index) => (
              <TouchableOpacity key={index} onPress={() => handelPress(task)}>
                <View style={styles.containerCards}>
                  <Text style={styles.textCardDescription}>{task.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          : null}

        <View style={styles.containerAddCardAndImage}>
          <TouchableOpacity onPress={createCard}>
            {inputCreateCard ? (
              <View style={styles.containerAddCard}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom de la carte"
                  value={cardName}
                  onChangeText={(text) => setCardName(text)}
                  autoFocus
                />
                <Image
                  style={styles.imageSend}
                  source={require("../../assets/imgs/ValidateBlue.png")}
                />
              </View>
            ) : (
              <Text style={styles.addCardText}>Ajouter une carte</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require("../../assets/imgs/AddImage.png")} />
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  containerCard: {
    width: 330,
    padding: 16,
    marginLeft: 25,
    marginRight: 16,
    backgroundColor: "#000000",
    borderRadius: 8,
  },
  headerCollum: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fcfcfc",
    fontSize: 16,
    fontWeight: "800",
  },
  containerCards: {
    backgroundColor: "#171b1e",
    width: "100%",
    marginBottom: 16,
    borderRadius: 4,
    padding: 8,
  },
  textCardDescription: {
    color: "#fcfcfc",
  },
  containerAddCardAndImage: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addCardText: {
    color: "#699dff",
    fontWeight: "500",
    fontSize: 16,
  },
  containerAddCard: {
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
