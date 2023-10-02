import React, { useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Login from './views/login'
import { auth } from './api/firebase'

export default function App() {
  const [profile, setProfile] = useState(null)

  auth.onAuthStateChanged(user => {
    if (user) {

    } else {
      setProfile(null)
    }
  })

  return (
    <View style={styles.container}>
      <Login />
    </View>
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
