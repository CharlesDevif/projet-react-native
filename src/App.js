import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { auth } from './api/firebase'
import AppContext from './context'

import Profile from './classes/Profile'
import LoginView from './views/login'
import RegisterView from './views/register'
import newBoard from './views/newBoard'
import AppNavigator from './components/appTabNavigator'



export default () => {
  const [profile, setProfile] = useState(null)
  const [firebaseUser, setFirebaseUser] = useState(null)

  useEffect(() => {                                 // sans ça react fait une boucle infini
    auth.onAuthStateChanged(async user => {         // détection des changement de connexion
      if (user) {
        setFirebaseUser(user)                       // récupération du firebaseUser
        Profile.listenById(user.uid, res => {       // récupération du profile
          setProfile(res)
        })
      } else {
        setProfile(null)
        setFirebaseUser(null)
      }
    })
  }, [])

  return (
    <AppContext.Provider value={{ auth, firebaseUser, profile, setProfile }}>
      <NavigationContainer>
        { profile ? isAuth : notAuth }
      </NavigationContainer>
    </AppContext.Provider>
  )
}

const Stack = createStackNavigator()
const notAuth =
<Stack.Navigator>
  <Stack.Screen name="login" component={LoginView} options={{ headerShown: false }} />
  <Stack.Screen name="register" component={RegisterView} options={{ headerShown: false }} />
</Stack.Navigator>

const AppStack = createStackNavigator()
const isAuth =
<AppStack.Navigator>
  <Stack.Screen name="home" component={AppNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="newTab" component={newBoard} options={{ title: 'Nouveau tableau' }} />
</AppStack.Navigator>
