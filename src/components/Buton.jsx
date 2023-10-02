import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({ text, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <View>
        <Text>{text}</Text>
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
