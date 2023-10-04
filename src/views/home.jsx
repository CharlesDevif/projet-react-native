import React, { useContext, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import AppContext from '../context'
import Board from '../classes/Board'
import AddContentMenu from '../components/addContentMenu'

export default () => {
  const { profile } = useContext(AppContext)
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)

  Board.listenByOwner(profile.id, res => {
    console.log(res)
  })
  return (
    <TouchableWithoutFeedback onPress={() => setMenuModalOpen(!isMenuModalOpen)}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.headerListeBoard}>
          { profile ? `Espace de travail de : ${profile.email}` : 'Déconnecté' }
        </Text>
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
