import { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import AppContext from '../../context'

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
    <TouchableOpacity style={styles.container} onPress={redirectToBoard}>
      <Text style={styles.text}>{board.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8
  },
  text: {
    color: 'red'
  }
})
