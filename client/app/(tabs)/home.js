import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View style={styles.container}>
      <Text>home</Text>
      
    </View>
  )
}

export default home


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

},

})