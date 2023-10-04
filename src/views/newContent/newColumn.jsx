import { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import SelectDropdown from 'react-native-select-dropdown'

import AppContext from '../../context'
import { Button, Input } from '../../components/layout'
import errorCodeToMessage from '../../functions/errorCodeToMessage'

export default () => {
  const { boards } = useContext(AppContext)
  const [name, setName] = useState('')
  const [board, setBoard] = useState(null)
  const navigation = useNavigation()

  function createColumn() {
    setName(name.trim())

    if (name === '') {
      Alert.alert('Nom invalide')
    } else if (!board) {
      Alert.alert('Board invalide')
    } else {
      if (!board.columns) {
        board.columns = []
      }
      board.columns.push({
        name: name
      })
      board.save()
        .then(() => {
          Alert.alert(`colonne ${name} créé.`)
          setName('')
          setBoard(null)
          navigation.goBack()
        })
        .catch((e) => {
          Alert.alert(errorCodeToMessage(e.code))
        })
    }
  }



  return (
    <View style={styles.container}>
      <Text>Nom de la Colonne</Text>
      <Input placeholder="Nom de la Colonne" value={name} onChange={setName} />
      <SelectDropdown data={boards} onSelect={setBoard} buttonTextAfterSelection={(board) => board.name} rowTextForSelection={(board) => board.name} />
      <Button onClick={createColumn}>Créer</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})