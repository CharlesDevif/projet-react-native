import { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import AddContentMenu from '../components/AddContentModal'
import BoardView from '../components/content/Board'

export default () => {
  const { profile, boards, setBoards } = useContext(AppContext)

  useEffect(() => {
    Board.listenByOwner(profile.id, res => {
      setBoards(res)
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerListeBoard}>
        { profile ? `Espace de travail de : ${profile.email}` : 'Déconnecté' }
      </Text>
      <View style={styles.boardsContainer}>
        { boards.map(board => <BoardView key={board.id} board={board} />) }
      </View>
      <AddContentMenu/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#171b1e'
  },
  headerListeBoard: {
    padding: 16,
    color: '#ffff',
    backgroundColor: '#000000',
    textAlign: 'center'
  },

  boardsContainer: {
    padding: 16,
    gap: 16,
    borderRadius : 8
  }
})
