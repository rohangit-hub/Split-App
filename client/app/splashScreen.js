import { View, Text , StyleSheet , Image, StatusBar, TouchableOpacity} from 'react-native'
import {
  responsiveScreenHeight as RH ,
  responsiveFontSize as RFS,
  responsiveScreenWidth as RW} from "react-native-responsive-dimensions";
import { useFonts } from 'expo-font';
import { SafeAreaProvider , SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import { useEffect, useState } from 'react';


const SplashScreen = () => {
   const router = useRouter()

  // STATES
  const [fontsLoaded] = useFonts({
    'Roboto_Condensed': require('../assets/fonts/Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf'),
  });

   if (!fontsLoaded) {
    return null; // Apply <AppLoading />
  }

  useEffect (()=>{
    setTimeout(()=>{
      router.push("/Login")
    },2000)

  },[fontsLoaded])

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#F1F0E9"} barStyle={"dark-content"}/>
      <Image
        source={require('../assets/images/S-Icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SplashScreen


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : "#F1F0E9",
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical : "center"
},
  image: {
    width: RW(60),
    height: RH(70),
  },
})