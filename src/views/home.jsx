import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'

import AppContext from '../context'

import ButtonWorkspace from '../components/Layout/ButtonWorkspace'



export default () => {
  const {profile} = useContext(AppContext)

  return (
    <SafeAreaView style={styles.container}>
      <Text>{profile ? `Connecter en tant que : ${profile.email}` : 'Déconnecté'}</Text>
      <ButtonWorkspace>+</ButtonWorkspace>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    gap: 8
  }
})
