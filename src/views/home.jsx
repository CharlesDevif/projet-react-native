import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppContext from "../context";
import ButtonWorkspace from "../components/Layout/ButtonWorkspace";

export default () => {
  const { profile } = useContext(AppContext);
  const [isBackgroundDarkened, setBackgroundDarkened] = useState(false);

  // Fonction pour assombrir le fond
  const darkenBackground = () => {
    setBackgroundDarkened(!isBackgroundDarkened);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.containerListeBoard}>
          <View style={styles.headerListeBoard}>
            <Text style={styles.textHeaderListeBoard}>
              {profile
                ? `Espace de travail de : ${profile.email}`
                : "Déconnecté"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.containerButtonAdd}>
        {isBackgroundDarkened ? (
          <>
            <View style={styles.buttonOverlayContainer}>
              <TouchableOpacity style={styles.buttonOverlay}>
                <Text style={styles.textOverlay}>Carte</Text>
                <View style={styles.imageOverlay}>
                  <Image source={require("../assets/imgs/Home.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOverlay}>
                <Text style={styles.textOverlay}>Tableau</Text>
                <View style={styles.imageOverlay}>
                  <Image source={require("../assets/imgs/Home.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <ButtonWorkspace onClick={darkenBackground}>+</ButtonWorkspace>
      </View>

      {isBackgroundDarkened && <View style={styles.overlay}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#171b1e",
  },
  headerListeBoard: {
    height: 40,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textHeaderListeBoard: {
    color: "#ffff",
  },
  containerListeBoard: {
    height: "90%",
  },
  containerButtonAdd: {
    position: "absolute",
    alignItems: "flex-end",
    width: "100%",
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 1,
  },
  buttonOverlayContainer: {
    width: "50%",
    flexDirection:'column',
    justifyContent: "space-around",
    height: 160,
  },
  buttonOverlay: {
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  imageOverlay:{
    backgroundColor: "#4bce98",
    padding: 10,
    borderRadius:20,
  },
  textOverlay:{
    padding: 10,
    marginRight: 10,
    fontSize: 15,
    fontWeight:"700",
    color: "#f4f4f4"
  }
});
