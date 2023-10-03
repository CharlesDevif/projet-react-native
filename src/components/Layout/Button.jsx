import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({ children, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
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
  }
})
