import { StatusBar } from 'expo-status-bar'
import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Image, Button ,Input} from "react-native-elements"
import {auth} from "../firebase";
const RegisterScreen = ({navigation}) => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[imageUrl, setimageUrl] = useState("");
    const handleRegister = () => {
         auth.createUserWithEmailAndPassword(email, password)
         .then( (authUser) => {
             authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl,
             }
             )
         }).catch(error =>  alert(error.message));
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="dark" ></StatusBar>
            <Image  source={{
                uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1024px-Signal-Logo.svg.png",
            }} style={{ width:100, height:100}} />
            <View style={{height:50}} />
            <Text h3 style={{marginBottom:50}}>Create a Signal Account</Text>
         <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)}/>
                <Input placeholder="Email"  type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Image URL"  type="text" value={imageUrl} onChangeText={(text) => setimageUrl(text)} />
         </View>
         <Button title="Register" onPress={handleRegister}></Button>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
          flex:1,
          alignItems: "center",
          justifyContent:"center"
    },
    inputContainer: {
        width: 300
    }
})
