import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'

import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../Input'
import Buton from '../Button'
import Link from '../Link'

export default ({ setForm }) => {
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} password />
      <Input placeholder="Confirm password" value={confirm} onChange={setConfirm} password />
      <Buton text="Register" onClick={register} />
      <Text>Already have an account ? <Link text="Sign in" onClick={() => setForm('login')} />.</Text>
    </View>
  )

  function register() {
    setEmail(email.trim())

    if (email !== '' && password !== '' && password === confirm) {
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        setEmail('')
        setPassword('')
        setConfirm('')
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
