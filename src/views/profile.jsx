import { StatusBar, StyleSheet, View } from 'react-native'
import { useContext } from 'react'

import AppContext from '../context'
import Button from '../components/Layout/Button'

export default () => {
  const {auth, firebaseUser, profile} = useContext(AppContext)
  
  function signOut() {
    auth.signOut()
  }

  function deleteAccount() {
    profile.delete()
    firebaseUser.delete()
    auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Button onClick={signOut}>Déconnexion</Button>
      <Button error onClick={deleteAccount}>Supprimer le compte</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
