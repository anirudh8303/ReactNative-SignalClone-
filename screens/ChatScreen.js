import React, {useLayoutEffect, useState, useEffect} from 'react'
import { KeyboardAvoidingView, Touchable } from 'react-native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {TextInput} from "react-native"
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from "firebase";
import {auth,db} from "../firebase"
const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const sendMessage =() => {
     db.collection("rooms").doc(route.params.id).collection("messages").add({
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         message: input,
         displayName: auth.currentUser.displayName,
         email:auth.currentUser.email,
     })
     setInput("");
    }
    useEffect(() => {
      const unsubscribe = db.collection("rooms").doc(route.params.id).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => 
       setMessages(
        snapshot.docs.map((doc) => ({
         id: doc.id,
         data: doc.data(),
        }))
       ))
       console.log(messages);
       return unsubscribe;
    }, [route])
    useLayoutEffect(() => {
        navigation.setOptions({
          title: "Chat",
          headerTitle: () => (
              <View style={{
                  flexDirection: "row",
                  alignItems: "center",
              }} >
               <Avatar  rounded source={{
                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj2KkuLpAwkCVmlhqiD2qc8RMRk30uKmGciw&usqp=CAU"
               }} />
               <View style={{marginRight:20}}></View>
               <Text  h1 style={{color: "white", fontWeight: "700" }}>{route.params.chatName}</Text>
              </View>
          )
        }
        )
      }, [navigation])
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={90} behavior={Platform.OS==="ios" ? "padding" : "height"}>
              <>
              <ScrollView contentContainerStyle={{
                  paddingTop:20,
              }}>
                  {messages.map(({id, data})=> 
                      data.email === auth.currentUser.email ? (
                       <View key={id} style={styles.reciever}>
                           <Text style ={styles.recieverText}>{data.message}</Text>
                       </View>
                      ):
                      (
                         <View key={id} style={styles.sender}>
                           <Text style ={styles.senderText}>{data.message}</Text>
                       </View>
                      )
                  )}
              </ScrollView>
              <View style={styles.footer}>
              <TextInput autoFocus style={styles.textInput} placeholder="Send message" value={input} onChangeText={(text)=> setInput(text)} />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                  <Ionicons  name="send" size={24} color="#2B68E6" ></Ionicons>
              </TouchableOpacity>
              </View>
               </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        marginBottom:5,
        padding:10,
        display: "flex",
        flexDirection : "row",
        alignItems: "center",
    },
    textInput: {
    padding:10,
    flex:1,
    borderWidth: 1,
    borderRadius: 30,
    borderColor:"transparent",
    color: "grey", 
    backgroundColor: "#ECECEC"
    },
    reciever: {
       padding:15,
       backgroundColor: "#ECECEC",
       alignSelf: "flex-end",
       borderRadius: 20,
       marginRight: 15,
       marginBottom:20,
       maxWidth:"80%",
       position: "relative",
    },
    sender: {
        padding:15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        marginBottom:20,
        maxWidth:"80%",
        position: "relative",
    },
    recieverText: {
      color: "black",
      fontWeight: "500",
      marginLeft: 10
    },
    senderText: {
       color: "white",
       fontWeight: '500',
       marginLeft: 10,
       marginBottom: 15
    }
})
