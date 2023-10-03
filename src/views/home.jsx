import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

import { auth } from '../api/firebase'
import AppContext from '../context'

import Button from '../components/Layout/Button'
import { useNavigation } from '@react-navigation/core'
import { useContext } from 'react'



export default () => {
  const {profile, setProfile} = useContext(AppContext)
  const navigation = useNavigation()
  function logout() {
    auth.signOut()


  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{profile ? `Connecter en tant que : ${profile.email}` : 'Déconnecté'}</Text>
      <Button onClick={logout}>Déconnexion</Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    gap: 8
  }
})
