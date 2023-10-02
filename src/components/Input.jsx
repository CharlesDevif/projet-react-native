import { StyleSheet, TextInput, View } from 'react-native'

export default ({ value, onChange, placeholder, passwordType }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={passwordType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8
  }
})
