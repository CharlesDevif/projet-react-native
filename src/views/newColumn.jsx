import { useContext, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../context'
import Column from '../classes/Column'
import { Button, Input } from '../components/Layout'

export default () => {
  const { profile } = useContext(AppContext)
  const [name, setName] = useState('')
  const [board, setBoard] = useState('')
  const navigation = useNavigation()

  function createColumn() {
    const new_column = new Column(null, board.id, name)
    new_column.save()
      .then(() => {
        Alert.alert(`colonne ${name} créé.`)
        navigation.goBack()
      })
      .catch((e) => {
        Alert.alert(e.code)
      })
  }



  return (
    <View style={styles.container}>
      <Text>Nom de la Colonne</Text>
      <Input placeholder="Nom de la Colonne" value={name} onChange={setName} />
      <Button onClick={createColumn}>Créer</Button>
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