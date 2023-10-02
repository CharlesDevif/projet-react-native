import React, { useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './views/login'
import Register from './views/register'
import { auth } from './api/firebase'
import Profile from './classes/Profile'



export default function App() {
  const [profile, setProfile] = useState(null)
  auth.onAuthStateChanged(async user => {
    if (user) {
      Profile.listenById(user.uid, res => {
        setProfile(res)
      })
    } else {
      setProfile(null)
    }
  })

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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
