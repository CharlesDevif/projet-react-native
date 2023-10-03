import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({ children, onClick, error, success }) => {
  return (
    <TouchableOpacity onPress={onClick} style={[
      styles.button,
      (error ? styles.error : null),
      (success ? styles.success : null)
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
  error: {
    backgroundColor: 'hsl(0, 50%, 50%)'
  },
  success: {
    backgroundColor: 'hsl(150, 50%, 50%)'
  }
})
