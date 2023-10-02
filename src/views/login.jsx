import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
export default () => {
  const [form, setForm] = useState('login')

  return (
    <View style={styles.container}>
      {
        form === 'login' ? <LoginForm setForm={setForm} /> : <RegisterForm setForm={setForm} />
      }
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
