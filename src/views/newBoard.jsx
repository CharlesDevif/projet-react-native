import { useContext, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import { Button, Input } from '../components/Layout'

export default () => {
  const { profile } = useContext(AppContext)
  const [name, setName] = useState('')

  function createBoard() {
    const new_board = new Board(null, name, profile.id)
    new_board.save()
      .then(() => {
        Alert.alert(`Tableau ${name} créé.`)
      })
      .catch((e) => {
        Alert.alert(e.code)
      })
  }



  return (
    <View style={styles.container}>
      <Text>Nom du Tableau</Text>
      <Input placeholder="Nom du Tableau" value={name} onChange={setName} />
      <Button onClick={createBoard}>Créer</Button>
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
