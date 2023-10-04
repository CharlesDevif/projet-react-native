import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { auth } from './api/firebase'
import AppContext from './context'

import Profile from './classes/Profile'

import loginView from './views/login'
import registerView from './views/register'
import newBoard from './views/newContent/newBoard'
import newColumn from './views/newContent/newColumn'

import AppNavigator from './components/AppTabNavigator'
import Loader from './components/Loader'



export default () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState(null)

  useEffect(() => {                                 // sans ça react fait une boucle infini
    auth.onAuthStateChanged(async user => {         // détection des changement de connexion
      if (user) {
        setFirebaseUser(user)                       // récupération du firebaseUser
        Profile.listenById(user.uid, res => {       // récupération du profile
          setProfile(res)
          setLoading(false)
        })
      } else {
        setProfile(null)
        setFirebaseUser(null)
        setLoading(false)
      }
    })
  }, [])

  return (
    <AppContext.Provider value={{
      auth, firebaseUser,
      profile, setProfile,
      boards, setBoards,
      currentBoard, setCurrentBoard
    }}>
      <NavigationContainer>
        { loading ? <Loader /> : profile ? isAuth : notAuth }
      </NavigationContainer>
    </AppContext.Provider>
  )
}

const Stack = createStackNavigator()
const notAuth =
<Stack.Navigator>
  <Stack.Screen name="login" component={loginView} options={{ headerShown: false }} />
  <Stack.Screen name="register" component={registerView} options={{ headerShown: false }} />
</Stack.Navigator>

const AppStack = createStackNavigator()
const isAuth =
<AppStack.Navigator>
  <Stack.Screen name="home" component={AppNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="newBoard" component={newBoard} options={{ title: 'Nouveau tableau' }} />
  <Stack.Screen name="newColumn" component={newColumn} options={{ title: 'Nouvelle colonne' }} />
</AppStack.Navigator>
