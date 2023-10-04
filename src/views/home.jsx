import { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import AddContentMenu from '../components/AddContentModal'
import BoardElement from '../components/content/Board'

export default () => {
  const { profile, boards, setBoards, setCurrentBoard } = useContext(AppContext)

  useEffect(() => {
    Board.listenByOwner(profile.id, res => {
      setBoards(res)
      const currentBoard = res.find(b => b.id === profile.currentBoard)
      if (currentBoard) {
        setCurrentBoard(currentBoard)
      } else if (res.length > 0) {
        setCurrentBoard(res[0])
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerListeBoard}>
        { profile ? `Espace de travail de : ${profile.email}` : 'Déconnecté' }
      </Text>
      <View style={styles.boardsContainer}>
        { boards.map(board => <BoardElement key={board.id} board={board} />) }
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
