import { NavigationContainer } from '@react-navigation/native'
import React , {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button ,Input } from "react-native-elements"
import {db}  from "../firebase"
const AddChatScreen = ({navigation}) => {
    const [roomname, setRoomname] = useState("")
    const addChat = () => {
       db.collection("rooms").add({
           roomName: roomname,
       }).then(()=> {
        navigation.goBack();
       })
       .catch((error)=> alert(error.message))
    }
    return (
        <View style ={styles.conatiner}>
          <Input onChangeText={(text)=> setRoomname(text)} value={roomname} autoFocus style={styles.Input} placeholder="Room Name" ></Input>  
           <Button style={styles.btn} title="Create Room" onPress={addChat}></Button>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    conatiner : {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        padding:10
    },
    Input: {
      width:300
    },
    btn: {
        width:300,
    }
})
