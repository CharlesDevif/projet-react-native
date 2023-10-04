import { Alert, Text } from 'react-native'
import Board from '../components/Board'
import { useState } from 'react'

export default () => {
  const [name, setName] = useState('')

  function createBoard() {
    const new_board = new Board(null, 'un super nom', profile.id)
    new_board.save()
      .then(() => {
        Alert.alert(`Tableau ${name} créé.`)
      })
      .catch((e) => {
        Alert.alert(e.code)
      })
  }



  return (
    <Text>Yo !!!!</Text>
  )
}