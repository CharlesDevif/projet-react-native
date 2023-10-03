import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonWorkspace = ({ children, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <View style={styles.buttonContainer}>
        <Text style={styles.textButton}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonWorkspace

const styles = StyleSheet.create({
  button: {
    borderRadius: 50, 
    width: 60, 
    height: 60, 
    backgroundColor: '#4bce98', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton:{
    fontSize : 30,
    fontWeight: "300"
  }
})
