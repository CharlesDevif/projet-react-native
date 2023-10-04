import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import AddContentMenu from '../components/AddContentModal'
import BoardView from '../components/content/Board'

export default () => {
  const { profile } = useContext(AppContext)
  const [boards, setBoards] = useState([])

    // Appelle cette fonction lorsque tu veux récupérer les boards
    const fetchBoards = () => {
      Board.listenByOwner(profile.id, (res) => {
        setBoards(res);
      });
    };
  
    // Utilise useEffect pour appeler fetchBoards au montage du composant
    useEffect(() => {
      fetchBoards();
    }, []);
  return (
   
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.headerListeBoard}>
          { profile ? `Espace de travail de : ${profile.email}` : 'Déconnecté' }
        </Text>
        <View style={styles.boardsContainer}>
        {boards.map((board) => (
          <BoardView key={board.id} board={board} />
        ))}
      </View>
        <AddContentMenu/>
      </View>

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

  boardsContainer: {
    padding: 16,
    gap: 16,
    borderRadius : 8,
  },
})
