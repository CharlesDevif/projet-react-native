import React, { useContext, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import AddContentMenu from '../components/AddContentMenu'

export default () => {
  const { profile } = useContext(AppContext)
  const [boards, setBoards] = useState([])

  const [isMenuModalOpen, setMenuModalOpen] = useState(false)

  Board.listenByOwner(profile.id, res => {
    setBoards(res)
  })
  return (
    <TouchableWithoutFeedback onPress={() => setMenuModalOpen(!isMenuModalOpen)}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.headerListeBoard}>
          { profile ? `Espace de travail de : ${profile.email}` : 'Déconnecté' }
        </Text>
        <View>
          {
            boards.map(board => {
              return (
                <Text key={board.id}>{board.name}</Text>
              )
            })
          }
        </View>
        <AddContentMenu  toggleMenu={isMenuModalOpen} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#171b1e',
  },
  headerListeBoard: {
    padding: 16,
    color: '#ffff',
    backgroundColor: '#000000',
    textAlign: 'center',
  },
})
