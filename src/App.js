import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { auth } from './api/firebase'
import AppContext from './context'

import Profile from './classes/Profile'
import login from './views/login'
import register from './views/register'
import home from './views/home'
import profile from './views/profile'

export default () => {
  const [profile, setProfile] = useState(null)
  useEffect(() => {                                 // sans ça react fait une boucle infini
    auth.onAuthStateChanged(async user => {         // détection des changement de connexion
      if (user) {
        Profile.listenById(user.uid, res => {       // récupération du profile
          setProfile(res)
        })
      } else {
        setProfile(null)
      }
    })
  }, [])

  return (
    <AppContext.Provider value={{ profile, setProfile }}>
      <NavigationContainer>
        { profile ? isAuth : notAuth }
      </NavigationContainer>
    </AppContext.Provider>
  )
}

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const notAuth =
<Stack.Navigator>
  <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
  <Stack.Screen name="register" component={register} options={{ headerShown: false }} />
</Stack.Navigator>

const isAuth =
<Tab.Navigator>
  <Tab.Screen name="home" component={home} />
  <Tab.Screen name="Profil" component={profile} />
</Tab.Navigator>
