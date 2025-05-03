import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

const chat = () => {
  return (
    <View style={styles.container}>
      <Text>chat</Text>
    </View>
  )
}

export default chat


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},

})

