import { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import SelectDropdown from 'react-native-select-dropdown'

import AppContext from '../../context'
import { Button, Input } from '../../components/layout'

export default () => {
  const { boards } = useContext(AppContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [board, setBoard] = useState(null)
  const [column, setColumn] = useState(null)
  const navigation = useNavigation()


  function createTask() {
    setName(name.trim())
    setDescription(description.trim())

    if (!board) {
      Alert.alert('Tableau invalide')
    } else {
      board.createTask(name, description, column, '')
        .then(() => {
          Alert.alert(`Tâche ${name} créé.`)
          setName('')
          setDescription('')
          setBoard(null)
          setColumn(null)
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
        <Input outlined blanc placeholder="Nom de la tâche" value={name} onChange={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Input outlined blanc placeholder="Description" value={description} onChange={setDescription} />
      </View>


      <SelectDropdown buttonStyle={{ width: '100%' }} defaultButtonText="Sélectionner un tableau" data={boards} onSelect={setBoard} buttonTextAfterSelection={board => board.name} rowTextForSelection={board => board.name} />
      {board && (
        <SelectDropdown buttonStyle={{ width: '100%' }} defaultButtonText="Sélectionner une colonne" data={board && board.columns} onSelect={setColumn} buttonTextAfterSelection={column => column.name} rowTextForSelection={column => column.name} disabled={board === null} />
      )}

      <Button basique onClick={createTask}>Créer</Button>
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