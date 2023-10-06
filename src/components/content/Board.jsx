import { useContext } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import AppContext from '../../context'
import { Button } from '../layout'

export default ({ board }) => {
  const { profile, setCurrentBoard } = useContext(AppContext)
  const navigation = useNavigation()

  function redirectToBoard() {
    setCurrentBoard(board)
    profile.currentBoard = board.id
    profile.save()
    navigation.navigate('boardView')
  }

  return (
    <Button outlined onClick={redirectToBoard}>
      <Text>{board.name}</Text>
    </Button>
  )
}
