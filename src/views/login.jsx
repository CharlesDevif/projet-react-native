import React, { useState } from "react";
import { View, TextInput, StyleSheet, StatusBar, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
        console.log("coucou");
      // Effectuer l'authentification ici
      // Si l'authentification réussit, rediriger l'utilisateur
      navigation.navigate("Accueil"); // Remplacez 'Accueil' par le nom de votre écran principal
    } catch (error) {
      console.error("Erreur d'authentification : ", error);
    }
  };

  const handleRegister= async () => {
    try {
        console.log("Redirection vers Register");
      // Effectuer l'authentification ici
      // Si l'authentification réussit, rediriger l'utilisateur
      navigation.navigate("Register"); // Remplacez 'Accueil' par le nom de votre écran principal
    } catch (error) {
      console.error("Erreur d'authentification : ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button text="Se connecter" onPress={handleLogin} />
      <Text onPress={handleRegister}>Pas encore inscrit point d'interogation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputText: {
    padding: 9,
    height: 45,
    width: 300,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#0065FF",
    borderRadius: 10

  },
});

export default Login;
