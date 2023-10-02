import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../api/firebase'

import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from '../Input'
import Buton from '../Button'
import Link from '../Link'

export default ({ setForm }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={pass} onChange={setPass} password />
      <Input placeholder="Confirm password" value={confirm} onChange={setConfirm} password />
      <Buton text="Register" onClick={register} />
      <Text>Already have an account ? <Link text="Sign in" onClick={() => setForm('login')} />.</Text>
    </View>
  )

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    justifyContent: "center"
  }
})
