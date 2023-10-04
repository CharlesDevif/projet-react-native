import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ButtonWorkspace from './layout/ButtonWorkspace'

export default () => {
  const [menuModal, setMenuModal] = useState(false)
  const navigation = useNavigation()

  return (
    <>
      <View style={styles.containerButtonAdd}>
        {menuModal &&
          <View style={styles.buttonOverlayContainer}>
            <TouchableOpacity style={styles.buttonOverlay}>
              <Text style={styles.textOverlay}>Carte</Text>
              <View style={styles.imageOverlay}>
                <Image source={require('../assets/imgs/Home.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOverlay} onPress={() => navigation.navigate('newTab')}>
              <Text style={styles.textOverlay}>Tableau</Text>
              <View style={styles.imageOverlay}>
                <Image source={require('../assets/imgs/Home.png')} />
              </View>
            </TouchableOpacity>
          </View>
        }
        <ButtonWorkspace onClick={() => setMenuModal(!menuModal)}>+</ButtonWorkspace>
      </View>

      {menuModal && <View style={styles.overlay} />}
    </>
  )
}

const styles = StyleSheet.create({
   
    containerButtonAdd: {
      position: "absolute",
      alignItems: "flex-end",
      width: "100%",
      bottom: 20,
      right: 20,
      zIndex: 2,
    },
    overlay: {
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      zIndex: 1,
    },
    buttonOverlayContainer: {
      width: "50%",
      flexDirection:'column',
      justifyContent: "space-around",
      height: 160,
    },
    buttonOverlay: {
      marginRight: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    imageOverlay:{
      backgroundColor: "#4bce98",
      padding: 10,
      borderRadius:20,
    },
    textOverlay:{
      padding: 10,
      marginRight: 10,
      fontSize: 15,
      fontWeight:"700",
      color: "#f4f4f4"
    }
  })
  
