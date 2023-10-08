import { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import SelectDropdown from 'react-native-select-dropdown'

import AppContext from '../../context'
import errorCodeToMessage from '../../functions/errorCodeToMessage'
import { Button, Input } from '../../components/layout'

export default () => {
  const { boards } = useContext(AppContext)
  const [name, setName] = useState('')
  const [board, setBoard] = useState(null)
  const navigation = useNavigation()

  function createColumn() {
    setName(name.trim())
    if (!board) {
      Alert.alert('Tableau invalide')
    } else {
      board.createColumn(name)
        .then(() => {
          Alert.alert(`colonne ${name} créé.`)
          setName('')
          setBoard(null)
          navigation.goBack()
        })
        .catch(e => {
          if (e.code) {
            Alert.alert(errorCodeToMessage(e.code))
          } else {
            Alert.alert(e.message)
          }
        })
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input outlined blanc placeholder="Nom de la Colonne" value={name} onChange={setName} />
      </View>
      <View style={styles.inputContainer}>
      <SelectDropdown buttonStyle={{ width: '100%',borderRadius:8 }} defaultButtonText="Sélectionner un tableau" data={boards} onSelect={setBoard} buttonTextAfterSelection={board => board.name} rowTextForSelection={board => board.name} />
      </View>
      <Button basique onClick={createColumn}>Créer</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#171b1e",

  },
  textStyle: {
    color: '#fcfcfc',
  },
  inputContainer: {
    width: '80%',
    height: 70,
    flexDirection: 'column',
    justifyContent: "space-around",
  },
})