import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({ children, onClick, success, warning, error, outlined }) => {
  return (
    <TouchableOpacity onPress={onClick} style={[
      styles.button,
      (success ? styles.success : null),
      (warning ? styles.warning : null),
      (error ? styles.error : null),
      (outlined ? styles.outlined : null)
    ]}>
      <View>
        <Text style={[outlined ? styles.text : null,
          (outlined && success ? styles.successText : null),
          (outlined && warning ? styles.warningText : null),
          (outlined && error ? styles.errorText : null)
        ]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent:"center",
    alignItems:'center',

    backgroundColor: 'hsl(200, 50%, 50%)',
    borderColor:'hsl(200, 50%, 50%)',
  },
  text: {
    color: 'hsl(200, 50%, 50%)',
    
  },

  success: {
    backgroundColor: 'hsl(90, 50%, 50%)',
    borderColor:'hsl(90, 50%, 50%)',
  },
  successText: {
    color: 'hsl(90, 50%, 50%)',
  },

  warning: {
    backgroundColor: 'hsl(30, 75%, 50%)',
    borderColor:'hsl(30, 75%, 50%)',
  },
  warningText: {
    color: 'hsl(30, 75%, 50%)',
  },

  error: {
    backgroundColor: 'hsl(0, 50%, 50%)',
    borderColor:'hsl(0, 50%, 50%)',
  },
  errorText: {
    color: 'hsl(0, 50%, 50%)',
    
  },

  outlined: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 2,
  },
})
