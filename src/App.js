import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Login from "./views/login";
import Register from "./views/register";
const Stack = createStackNavigator()

export default function App() {
  const [profile, setProfile] = useState(null);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  options={{ headerShown: false }}   name="Login" component={Login} />
          <Stack.Screen  options={{ headerShown: false }}   name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
 
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
});
