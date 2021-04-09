import { NavigationContainer } from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar}  from "react-native-elements"
const CustomList = ({navigation ,id , chatName, chatSubtitle, enterChat}) => {
    return (
        <ListItem onPress={()=>enterChat(id, chatName)} key={id} bottomDivider  style={styles.container}>
            <Avatar  size={40} rounded source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj2KkuLpAwkCVmlhqiD2qc8RMRk30uKmGciw&usqp=CAU"
            }}/>
            <ListItem.Content >
                <ListItem.Title>
                    {chatName}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomList

const styles = StyleSheet.create({
    container: {
       alignItems: "center",
    },
})
