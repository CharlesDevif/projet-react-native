import { StyleSheet, Text } from 'react-native'

export default ({ text, onClick }) => {
  return (
    <Text onPress={onClick} style={styles.link}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'hsl(200, 50%, 50%)'
  }
})
