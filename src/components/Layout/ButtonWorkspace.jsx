import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonWorkspace = ({ children, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <View>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  )
  
}

export default ButtonWorkspace

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'hsl(200, 50%, 50%)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
      }
})