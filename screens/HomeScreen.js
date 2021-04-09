import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Button } from "react-native-elements"
import CustomList from "../components/CustomList"
import {auth, db} from "../firebase";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native'
import { set } from 'react-native-reanimated'
const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        db.collection("rooms").onSnapshot((snpashot) => 
        setChats(snpashot.docs.map((doc) => (
            {
                id: doc.id,
                data: doc.data()
            }
        )))
  )
    }, [])
    const signOut =() => {
        auth.signOut().then(()=> {
            navigation.replace("Login")
        })
    }
    useLayoutEffect(() => {
      navigation.setOptions({
          title: "Signal",
          headerStyle: { backgroundColor: "#fff"},
          headerTitleStyle: { color: "black"},
          headerTintColor: "black",
          headerLeft: () => (
           <View style={{marginLeft:20}}>
               <Avatar onPress={signOut} rounded source={{
                   uri: auth?.currentUser?.photoURL
               }} />
           </View>
          ),
          headerRight: () => (
            <View style={{marginRight:20, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}} >
                <TouchableOpacity  activeOpacity={0.5}> 
                <AntDesign name="camerao" size={ 24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} >
                <SimpleLineIcons onPress={()=> navigation.navigate("AddChat")} name="pencil" size={24} color="black" style={{marginLeft:20}} />
                </TouchableOpacity>
            </View>
          )
        })
    }, [navigation])
    const enterChat =(id, chatName) => {
        navigation.navigate('room', {
            id,
            chatName,
        })
    }
    return (
        <SafeAreaView>
        <ScrollView style={styles.container}>
            { chats.map((chat) => 
             <CustomList key={chat.id} id={chat.id} chatName={chat.data.roomName} chatSubtitle={""} enterChat={enterChat}/>
            ) }
        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
