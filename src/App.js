import React, { useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Login from './views/login'
import { auth } from './api/firebase'
import Profile from './classes/Profile'

export default function App() {
  const [profile, setProfile] = useState(null)

  auth.onAuthStateChanged(user => {
    if (user) {
      Profile.listenById(user.uid, res => {
        setProfile(res)
      })
    } else {
      setProfile(null)
    }
  })

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
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
