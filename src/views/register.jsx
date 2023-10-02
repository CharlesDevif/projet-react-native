import React, {useState} from 'react'
import {View, StyleSheet, Text, StatusBar, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'



export default () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigation = useNavigation()

  function register() {
    setEmail(email.trim())

    if (email !== '' && pass.length >= 6 && pass === confirm) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          setEmail('')
          setPass('')
          setConfirm('')
        })
        .catch((e) => {
          Alert.alert(JSON.stringify(e))
        })
    }
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={pass} onChange={setPass} passwordType />
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
    justifyContent: "center"
  }
})
