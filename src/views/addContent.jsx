import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import Board from "../components/Board"
import Button from '../components/Layout/Button'


export default () => {
    const [name, setName] = useState('')
    const [owner, setOwner] = useState('')


    function addContent() {
      
        const new_board = new Board(name, user.uid)
        new_board.add()
    }

  return (
    <View style={styles.container}>
      
      <Button onClick={addContent}>+</Button>
      
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