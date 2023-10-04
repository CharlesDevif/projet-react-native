import { useContext } from 'react'
import { StyleSheet,View, Text, TouchableOpacity} from 'react-native'



export default ({ column }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{column.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 250,
    padding: 16,
    marginLeft: 25,
    marginRight:16,
    backgroundColor: "#000000",
    borderRadius: 8
  },
  text: {
    color: '#fcfcfc'
  }
})
