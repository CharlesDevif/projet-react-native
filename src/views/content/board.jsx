import { useContext } from 'react'
import { Text,View,ScrollView,StyleSheet, StatusBar, Alert } from 'react-native'

import AppContext from '../../context'
import { Button } from '../../components/layout'
import Column from '../../components/content/Column'


export default () => {
  const { currentBoard } = useContext(AppContext)

  function deleteBoard() {
    currentBoard.delete()
      .then(() => {
        Alert.alert()
      })
  }

  const colomns = [
    { name: 'lorem' },
    { name: 'lorem' },
    { name: 'lorem' },
    { name: 'lorem' },
    { name: 'lorem' },
    { name: 'lorem' }
  ]



  return (
    <View style={styles.container}>

      <View>
      <Text>{currentBoard.name}</Text>
      <Button onClick={deleteBoard} error>Supprimer le tableau</Button>
      </View>
      <ScrollView style={styles.scrollConteneur} horizontal={true} showsHorizontalScrollIndicator={false}>
        {colomns ?
          colomns.map((col, index) =>
            <Column key={index} column={col}></Column>
          )
        : <Text>Aucune colonne.</Text>}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollConteneur: {
    backgroundColor:"#25a7ef",
    paddingTop: 24,
    width: '100%',
  }
})