import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect }from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button ,Input, Image} from "react-native-elements"
import {auth}  from "../firebase"
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged((authUser)=> {
        if(authUser) {
            navigation.replace("Chats")
        } 
     })
      return unsubscribe;
    }, [])
    const signIn = () => {
       auth.signInWithEmailAndPassword(email, password)
       .catch((error)=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="dark"></StatusBar>
            <Image  source={{
                uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1024px-Signal-Logo.svg.png",
            }} style={{ width:200, height:200}} />
            <View style={{height:50}} />
        <View style={styles.inputContainer}>
           <Input placeholder="Email" autoFocus type="email" value={email}  onChangeText={(text) => setEmail(text)}/>
           <Input placeholder="Password" secureTextEntry type="password" value={password}  onChangeText={(text) => setPassword(text)} />
        </View> 
        <Button conatinerStyle={styles.button} onPress={signIn} title="Login" />  
        <Button onPress={()=> navigation.navigate('Register')} containerStyle={styles.button} title="Register" type="outline" />
        <View style={{height:150}}></View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "white",

    },
    inputContainer: {
        width:300,
    },
    button :  {
    width:200,
    marginTop:10
    },
})
