import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'

export default () => {
  return (
    <View style={styles.container}>
      <Text>Chargement...</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
