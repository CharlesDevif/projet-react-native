import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ButtonWorkspace from '../components/Layout/ButtonWorkspace'

export default () => {
  const [menuModal, setMenuModal] = useState(false)
  const navigation = useNavigation()

  // Fonction pour fermer le menu modal lorsque l'utilisateur clique en dehors
  const closeMenuModal = () => {
    setMenuModal(false)
  }

  return (
    <TouchableWithoutFeedback onPress={closeMenuModal}>
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
    </TouchableWithoutFeedback>
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
