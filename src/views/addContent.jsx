import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import Board from "../components/Board"


export default () => {
    const [name, setName] = useState('')
    const [owner, setOwner] = useState('')


    function addContent() {
        
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