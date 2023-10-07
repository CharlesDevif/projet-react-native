import { StyleSheet, TextInput, View } from 'react-native'

export default ({ value, onChange, placeholder, passwordType, blanc, warning, error, outlined }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[outlined ? styles.input : null,
          (outlined && blanc ? styles.blanc : null),
          (outlined && warning ? styles.warning : null),
          (outlined && error ? styles.error : null)
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={passwordType}
        placeholderTextColor={"#fcfcfc"} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
  },

  text:{
    color: '#fcfcfc'
  },

  blanc: {
    borderColor:'#fcfcfc',
    color: '#fcfcfc',
  },

  warning: {
    backgroundColor: 'hsl(30, 75%, 50%)',
    borderColor:'hsl(30, 75%, 50%)',
  },

  error: {
    backgroundColor: 'hsl(0, 50%, 50%)',
    borderColor:'hsl(0, 50%, 50%)',
  },

  outlined: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 2,
  }
})
