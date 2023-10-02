import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../components/Input'
import Buton from '../components/Buton'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} password />
      <Buton text="Connexion" onClick={login} />
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
