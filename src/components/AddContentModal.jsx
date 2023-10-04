import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ButtonWorkspace from './layout/ButtonWorkspace'

export default () => {
  const [menuModal, setMenuModal] = useState(false)
  const navigation = useNavigation()

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setMenuModal(false)}>
        <View style={[styles.containerButtonAdd, menuModal && styles.open]}>
          {menuModal && (
            <>
              <TouchableOpacity style={styles.buttonOverlay}>
                <Text style={styles.textOverlay}>Carte</Text>
                <View style={styles.imageOverlay}>
                  <Image source={require('../assets/imgs/Home.png')} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOverlay}
                onPress={() => navigation.navigate('newColumn')}
              >
                <Text style={styles.textOverlay}>Colonne</Text>
                <View style={styles.imageOverlay}>
                  <Image source={require('../assets/imgs/Home.png')} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOverlay}
                onPress={() => navigation.navigate('newTab')}
              >
                <Text style={styles.textOverlay}>Tableau</Text>
                <View style={styles.imageOverlay}>
                  <Image source={require('../assets/imgs/Home.png')} />
                </View>
              </TouchableOpacity>
            </>
          )}
          <ButtonWorkspace onClick={() => setMenuModal(!menuModal)}>+</ButtonWorkspace>
        </View>
      </TouchableWithoutFeedback>
      <View style={menuModal ? styles.overlay : {}} />
    </>
  )
}

const styles = StyleSheet.create({
  containerButtonAdd: {
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    gap: 20,

    bottom: 0,
    right: 0,
    zIndex: 2
  },
  open: {
    height: '100%',
    width: '100%'
  },
  buttonOverlay: {
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  imageOverlay: {
    backgroundColor: '#4bce98',
    padding: 10,
    borderRadius: 20
  },
  textOverlay: {
    padding: 10,
    marginRight: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#f4f4f4'
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})
