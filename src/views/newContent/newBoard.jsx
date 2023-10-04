import { useContext, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../../context'
import errorCodeToMessage from '../../functions/errorCodeToMessage'
import Board from '../../classes/Board'
import { Button, Input } from '../../components/layout'

export default () => {
  const { profile, setCurrentBoard } = useContext(AppContext)
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function createBoard() {
    setName(name.trim())
    if (name === '') {
      Alert.alert('Nom invalide.')
    } else {
      const new_board = new Board(null, name, profile.id, [])
      new_board.save()
        .then(() => {
          Alert.alert(`Tableau "${name}" créé.`)
          navigation.goBack()
  
          setCurrentBoard(new_board)
          navigation.navigate('boardView')
        })
        .catch((e) => {
          Alert.alert(errorCodeToMessage(e.code))
        })
    }
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
