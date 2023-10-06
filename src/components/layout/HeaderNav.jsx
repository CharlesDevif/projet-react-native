import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";

export default function HeaderNav({currentBoard}) {

  function deleteBoard() {
    currentBoard.delete().then(() => {
      Alert.alert();
    });
  }

  return (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeader} >{currentBoard.name}</Text>
      <Image source={require('../../assets/imgs/BurgerMenu.png')} />
      {/* <Button onClick={deleteBoard} error>
        Supprimer le tableau
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
    containerHeader:{
        width:'100%',
        height: 50,
        padding: 10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        backgroundColor:"#18538c"
    },
    textHeader:{
        fontSize: 20,
        fontWeight: "600",
        color:"#fcfcfc"
    }
});
