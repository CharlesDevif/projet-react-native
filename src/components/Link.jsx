import { StyleSheet, Text } from 'react-native'

export default ({ children, onClick }) => {
  return (
    <Text onPress={onClick} style={styles.link}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'hsl(200, 50%, 50%)'
  }
})
