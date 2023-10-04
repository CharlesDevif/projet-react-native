import { Text,View,ScrollView,StyleSheet, StatusBar, Alert } from 'react-native'
import AppContext from '../../context'
import { useContext } from 'react'
import { Button } from '../../components/layout'


export default () => {
  const { currentBoard } = useContext(AppContext)

  function deleteBoard() {
    Alert.alert('Comment ça mon reuf ?')
  }



  return (
    <View style={styles.container}>
      <View >
        <Text>{currentBoard.name}</Text>
        <Button onClick={deleteBoard} error>Supprimer le tableau</Button>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {currentBoard.columns && currentBoard.columns.map((col, index) =>
          <Text key={index}>{col.name}</Text>
        )}
      </ScrollView>
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