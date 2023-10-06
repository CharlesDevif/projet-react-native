import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'

import { Button } from '../components/layout'
import AppContext from '../context'

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
        <View style={styles.card}>
          <Text style={styles.title}>プロフィール</Text>
        </View>
        <View style={styles.button}>
          <Button onClick={signOut}>切断する</Button>
          <Button outlined error onClick={deleteAccount}>アカウントを削除する</Button>
        </View>
      </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "#171b1e",
  },
  title: {
    color: '#fcfcfc',
    fontSize: 28,
  },
  card: {
    width: 330,
    alignItems: 'center',
    padding: 16,
    marginLeft: 25,
    marginRight: 16,
    backgroundColor: "#171b1e",
    borderWidth: 2,
    borderColor: '#fcfcfc',
    borderRadius: 8,
  },
  button: {
    gap:16,
  }
})
  
