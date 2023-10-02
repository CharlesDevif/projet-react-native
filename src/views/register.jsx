import React, {useState} from 'react'
import {View, StyleSheet, Text, Alert, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../api/firebase'

import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Profile from '../classes/Profile'



export default () => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigation = useNavigation()

  function register() {
    setEmail(email.trim())

    if (email !== '') {
      Alert.alert('Adresse email invalide.')
    } else if (password !== confirm) {
      Alert.alert('Les deux mots de passe doivent être identiques.')
    } else if (password.length < 6) {
      Alert.alert('Le mot de passe doit faire au moins 6 caractères.')
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          const new_profile = new Profile(res.user.uid, email)
          new_profile.add().then(() => {
            navigation.navigate('home')
          })
        })
        .catch((e) => {
          Alert.alert(e.code)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPass} passwordType />
      <Input placeholder="Confirm password" value={confirm} onChange={setConfirm} passwordType />
      <Button text="S'enregistrer" onClick={register} />
      <Text>Déjà inscrit ? <Link text="Cliquez ici ?" onClick={() => navigation.goBack()} />.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
