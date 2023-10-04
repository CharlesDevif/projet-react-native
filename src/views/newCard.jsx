import { useContext, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../context'
import { Card, Board, Column } from '../classes'
import { Button, Input } from '../components/layout'

export default () => {
  const { profile } = useContext(AppContext)
  const [name, setName] = useState('')
  const [board, setBoard] = useState('')
  const [column, setColumn] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const navigation = useNavigation()

  function createCard() {
    const new_card = new Card(null, column.id ,board.id, name, description, image)
    new_card.save()
      .then(() => {
        Alert.alert(`card ${name} créé.`)
        navigation.goBack()
      })
      .catch((e) => {
        Alert.alert(e.code)
      })
  }



  return (
    <View style={styles.container}>
      <Text>Nom de la Card</Text>
      <Input placeholder="Nom de la Card" value={name} onChange={setName} />
      <Text>Description</Text>
      <Input placeholder="Description" value={description} onChange={setDescription} />
      <Text>Image</Text>
      <Input placeholder="Image" value={image} onChange={setImage} />
      <Button onClick={createCard}>Créer</Button>
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