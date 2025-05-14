import {Link , useRouter} from 'expo-router';
import { View, Text, StyleSheet, StatusBar , TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  responsiveScreenHeight as RH ,
  responsiveFontSize as RFS,
  responsiveScreenWidth as RW} from "react-native-responsive-dimensions";


const Register = () => {
  const [fontsLoaded] = useFonts({
    'Roboto_Condensed': require('../assets/fonts/Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf'),
    'RobotoCondensed-Italic' : require('../assets/fonts/Roboto_Condensed/RobotoCondensed-Italic-VariableFont_wght.ttf')
  });

  if (!fontsLoaded) {
    return null; // or return <AppLoading />
  }

  const router = useRouter()
  
  // state
  const[fullName, setFullName] = useState('')
  const[userName , setUserName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass , setConfirmPass] = useState("")

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3C3D37" barStyle="light-content" />
      <Text style= {styles.loginLogo} >REGISTER</Text>

      <View style={styles.formContainer}>
      <TextInput
          style = {styles.formContainerText}
          onChangeText={setFullName}
          value={fullName}
          placeholder="Full Name"
        />

      <TextInput
          style = {styles.formContainerText}
          onChangeText={setUserName}
          value={userName}
          placeholder="User Name"
        />

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

        <TextInput
          style = {styles.formContainerText}
          onChangeText={setConfirmPass}
          value={confirmPass}
          placeholder="Confirm Password"
          secureTextEntry={false}
        />

        <Text style={styles.registerPageText}>Alreday have an account ? <Text onPress={() => router.push("/Login")} style={{color:"blue"}}> Sign In</Text></Text>
      </View>
      

    </View>
  );
};

export default Register;

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
    flex: 2,
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
    marginTop: RW(6)
  },
  registerPageText:{
    marginTop :RW(8),
    color :'#000000',
    textAlign : "center",
    textAlignVertical : "center",
    fontSize : RW(4),
    fontFamily : "Roboto_Condensed",

  }
});
