import { Text,View,ScrollView,StyleSheet, StatusBar, Alert } from 'react-native'
import AppContext from '../../context'
import { useContext, useEffect, useState } from 'react'
import Column from '../../classes/Column'
import { Button } from '../../components/layout'


export default () => {
  const { currentBoard } = useContext(AppContext)
  const [columns, setColumns]= useState([])

  function deleteBoard() {
    Alert.alert('Comment ça mon reuf ?')
  }

  useEffect(() => {
    Column.listenByBoard(currentBoard.id, res => {
      console.log(res)
      setColumns(res)
    })
  }, [])



  return (
    <View style={styles.container}>
      <View >
        <Text>{currentBoard.name}</Text>
        <Button onClick={deleteBoard} error>Supprimer le tableau</Button>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {columns.map(col => <Text>{col.name}</Text>)}
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