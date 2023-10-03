import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({ children, onClick, success, warning, error }) => {
  return (
    <TouchableOpacity onPress={onClick} style={[
      styles.button,
      (success ? styles.success : null),
      (warning ? styles.warning : null),
      (error ? styles.error : null)
    ]}>
      <View>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'hsl(200, 50%, 50%)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  success: {
    backgroundColor: 'hsl(90, 50%, 50%)'
  },
  warning: {
    backgroundColor: 'hsl(30, 75%, 50%)'
  },
  error: {
    backgroundColor: 'hsl(0, 50%, 50%)'
  }
})
