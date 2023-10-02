import React, { useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import Login from './views/login'
import Home from './views/acceuil'

// const Stack = createStackNavigator()

export default function App() {
  const [profile, setProfile] = useState(null)

  return (
    <View style={styles.container}>
      <Login />
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen  options={{ headerShown: false }} name="Acceuil" component={Home} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
