import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../Input'
import Buton from '../Button'
import Link from '../Link'

export default ({ setForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} password />
      <Buton text="Connexion" onClick={login} />
      <Text>New here ? <Link text="Create an account" onClick={() => setForm('register')} />.</Text>
    </View>
  )

  function login() {

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
