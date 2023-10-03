import { StatusBar, StyleSheet, View } from 'react-native'

export default () => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
