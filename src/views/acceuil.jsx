import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export function Vue2() {
  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container}>
        <Text>Bienvenue en page 2</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  bloc: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
});
