import React, { useState } from "react"
import { View, StyleSheet, Text, StatusBar, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../api/firebase'

import errorCodeToMessage from '../functions/errorCodeToMessage'
import Button from "../components/Layout/Button"
import Input from '../components/Layout/Input'
import Link from '../components/Layout/Link'



export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch(e => {
        Alert.alert(errorCodeToMessage(e.code))
      })
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} passwordType />
      <Button onClick={login}>Se connecter</Button>
      <Text>Pas encore inscrit ? <Link onClick={() => navigation.navigate('register')}>Cliquez ici</Link>.</Text>
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
