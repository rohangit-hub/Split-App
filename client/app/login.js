import {Link , useRouter} from 'expo-router';
import { View, Text, StyleSheet, StatusBar , TextInput , Image, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  responsiveScreenHeight as RH ,
  responsiveFontSize as RFS,
  responsiveScreenWidth as RW} from "react-native-responsive-dimensions";


const Login = () => {
  const [fontsLoaded] = useFonts({
    'Roboto_Condensed': require('../assets/fonts/Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf'),
    'RobotoCondensed-Italic' : require('../assets/fonts/Roboto_Condensed/RobotoCondensed-Italic-VariableFont_wght.ttf')
  });

  if (!fontsLoaded) {
    return null; // or return <AppLoading />
  }

  const router = useRouter()
  
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3C3D37" barStyle="light-content" />
      <Text style= {styles.loginLogo} >LOGIN</Text>

      <View style={styles.formContainer}>
      <TextInput
          style = {styles.formContainerText}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />

        <TextInput
          style = {styles.formContainerText}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Text style={styles.registerPageText}>Don't have an account ? <Text onPress={() => router.push("/Register")} style={{color:"blue"}}> Sign Up </Text></Text>
      </View>
      <TouchableOpacity style={styles.addContainer} >
        <Image
        source={require('../assets/images/addImage.png')} // local image
        style={styles.image}
        resizeMode= "contain"
      />
      </TouchableOpacity >
      

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
    fontFamily: "Roboto_Condensed"
  },
  loginLogo: {
    flex: 1,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize : RW(12),
    fontFamily : "Roboto_Condensed",
  },
  formContainer: {
    flex: 1.5,
    color: '#ECDFCC',
    justifyContent : "flex-start",
    alignItems : "center",
    fontFamily : "Roboto_Condensed",
    padding: RW(2),
    width: RW(100),
  },
  formContainerText:{
    width : RW(90),
    color :'#000000',
    paddingLeft : RW(5),
    textAlign : "left",
    textAlignVertical : "center",
    fontSize : RW(4),
    borderWidth : 2,
    borderColor : "#B6B09F",
    borderRadius : RW(5),
    marginTop: RW(8)
  },
  registerPageText:{
    marginTop :RW(8),
    color :'#000000',
    textAlign : "center",
    textAlignVertical : "center",
    fontSize : RW(4),
    fontFamily : "Roboto_Condensed",
  },
  addContainer:{
    flex:1,
    justifyContent: "center",
    alignItems:"center",
  },
  image: {
    width: RW(99),
  },
});
