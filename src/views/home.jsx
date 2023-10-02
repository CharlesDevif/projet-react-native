import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

import { auth } from '../api/firebase'

import Button from '../components/Button'
import { useNavigation } from '@react-navigation/core'



export default ({ profile, setProfile }) => {
  const navigation = useNavigation()
  function logout() {
    auth.signOut()
    navigation.navigate('login')
    setProfile(null)
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
