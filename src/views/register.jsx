import React, {useState} from 'react'
import {View, StyleSheet, Text, Alert, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../api/firebase'

import Profile from '../classes/Profile'
import { Button, Input, Link } from '../components/Layout'
import errorCodeToMessage from '../functions/errorCodeToMessage'



export default () => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigation = useNavigation()

  function register() {
    setEmail(email.trim())

    if (email === '') {
      Alert.alert('Adresse email invalide.')
    } else if (password !== confirm) {
      Alert.alert('Les deux mots de passe doivent être identiques.')
    } else if (password.length < 6) {
      Alert.alert('Le mot de passe doit faire au moins 6 caractères.')
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          const new_profile = new Profile(res.user.uid, email)
          new_profile.add()
        })
        .catch((e) => {
          Alert.alert(errorCodeToMessage(e.code))
        })
    }
  }

  function loginWithGoogle() {
    Alert.alert(`WIP - "signInWithPopup" n'est pas utilisable en react Native.`)
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPass} passwordType />
      <Input placeholder="Confirm password" value={confirm} onChange={setConfirm} passwordType />
      <Button onClick={register}>S'enregistrer</Button>
      <Text>Déjà inscrit ? <Link onClick={() => navigation.goBack()}>Cliquez ici</Link>.</Text>
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
