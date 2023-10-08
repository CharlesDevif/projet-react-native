import { useContext, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../../context'
import errorCodeToMessage from '../../functions/errorCodeToMessage'
import Board from '../../classes/Board'
import { Button, Input } from '../../components/layout'

export default () => {
  const { profile, setCurrentBoard, boards } = useContext(AppContext)
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function createBoard() {
    setName(name.trim())
    if (name === '') {
      Alert.alert('Nom invalide.')
    } else if (boards.some(b => b.name === name)) {
      Alert.alert('Nom déjà utilisé')
    } else {
      const new_board = new Board(null, name, profile.id, [])
      new_board.save()
        .then(() => {
          Alert.alert(`Tableau "${name}" créé.`)
          setCurrentBoard(new_board)
          navigation.navigate('boardView')
        })
        .catch(e => {
          if (e.code) {
            Alert.alert(errorCodeToMessage(e.code))
          } else {
            Alert.alert(e.message)
          }
        })
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input outlined blanc placeholder="Nom du Tableau" value={name} onChange={setName} />
      </View>
      <Button basique onClick={createBoard}>Créer</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "#171b1e",
  },
  textStyle: {
    color: '#fcfcfc',
  },
  inputContainer: {
    width: '80%',
    height: 70,
    flexDirection: 'column',
    justifyContent: "space-around",
  },
})
