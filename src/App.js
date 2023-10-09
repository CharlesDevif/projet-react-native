import { useEffect, useState } from 'react'
import { Alert, StyleSheet, StatusBar, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { auth } from './api/firebase'
import { sendEmailVerification } from 'firebase/auth'
import AppContext from './context'

import Profile from './classes/Profile'

import loginView from './views/login'
import registerView from './views/register'
import newBoard from './views/newContent/newBoard'
import newColumn from './views/newContent/newColumn'
import newTask from './views/newContent/newTask'

import AppNavigator from './components/AppTabNavigator'
import Loader from './components/Loader'
import modifTask from './views/newContent/modifTask'
import { Button } from './components/layout'



export default () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  const [currentColumn, setCurrentColumn] = useState(null)

  async function sendConfirmEmail() {
    await sendEmailVerification(firebaseUser)
    Alert.alert('Email envoyé')
  }

  const [isEmailVerified, setIsEmailVerified] = useState(false);

	

  useEffect(() => {                                 // sans ça react fait une boucle infini
    auth.onAuthStateChanged(user => {         // détection des changement de connexion
      if (user) {
        if (user && user.emailVerified) {
          setIsEmailVerified(true)
        } else {
          setIsEmailVerified(false)
        }

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

 

  if (firebaseUser && !isEmailVerified) {
    return (
      <View style={styles.container}>
        <Text>Vous n'avez pas encore vérifié votre email.</Text>
        <Button outlined onClick={sendConfirmEmail}>Renvoyer un email</Button>
        <Button onClick={() => auth.signOut()}>Déconnexion</Button>
      </View>
    )
  } else {
    return (
      <AppContext.Provider value={{
        auth, firebaseUser,
        profile, setProfile,
        boards, setBoards,
        currentBoard, setCurrentBoard,
        currentColumn, setCurrentColumn,
        currentTask, setCurrentTask
      }}>
        <NavigationContainer>
          { loading ? <Loader /> : profile ? isAuth : notAuth }
        </NavigationContainer>
      </AppContext.Provider>
    )
  }
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
  <Stack.Screen name="newTask" component={newTask} options={{ title: 'Nouvelle Tâche' }} />
  <Stack.Screen name="modifTask" component={modifTask} options={{ title: 'Modif Tâche', headerShown: false }}  />
</AppStack.Navigator>

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#171b1e",
	}
})
