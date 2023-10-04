import { StyleSheet, Text, View} from 'react-native'

export default ({ board }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{board.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8
  },
  text: {
    color: 'red'
  }
})
