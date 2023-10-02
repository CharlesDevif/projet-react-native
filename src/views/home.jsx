import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home page !</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
