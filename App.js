import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from "./screens/ChatScreen" 
const Stack = createStackNavigator();
 const globalscreenoptions = {
   headerStyle: {backgroundColor: "#2C6BED"},
   headerTitleStyle: {color: "white"},
   headerTintStyle: {color: "white"}
 }
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={globalscreenoptions}>
      <Stack.Screen name="Login" component={LoginScreen}>
      </Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}>
      </Stack.Screen>
      <Stack.Screen name="Chats" component={HomeScreen}>
      </Stack.Screen>
      <Stack.Screen name="AddChat" component={AddChatScreen}>
      </Stack.Screen>
      <Stack.Screen name="room" component={ChatScreen}>
      </Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
