import React, { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Button from "../components/Button"
import Input from '../components/Input'
import Link from '../components/Link'



export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const login = async () => {
    console.log('login') //TODO: login method
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Password" value={password} onChange={setPassword} passwordType />
      <Button text="Se connecter" onClick={login} />
      <Text>Pas encore inscrit ? <Link text="Cliquez ici" onClick={() => navigation.navigate('register')} />.</Text>
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
