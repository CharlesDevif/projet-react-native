import React, { useState } from 'react'
import { View, StyleSheet, Text, StatusBar, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../api/firebase'

import errorCodeToMessage from '../functions/errorCodeToMessage'
import { Button, Input, Link } from '../components/layout'



export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .catch(e => {
        Alert.alert(errorCodeToMessage(e.code))
      })
  }

  function loginWithGoogle() {
    Alert.alert(`WIP - "signInWithPopup" n'est pas utilisable en react Native.`)
    // const provider = new GoogleAuthProvider()

    // signInWithPopup(auth, provider)
    //   .catch((e) => {
    //     Alert.alert(errorCodeToMessage(e.code))
    //   })
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} passwordType />
      <Button onClick={login}>Se connecter</Button>
      <Text>Pas encore inscrit ? <Link onClick={() => navigation.navigate('register')}>Cliquez ici</Link>.</Text>
      <Text>Ou</Text>
      <Button warning onClick={loginWithGoogle}>Se connecter avec Google</Button>
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
