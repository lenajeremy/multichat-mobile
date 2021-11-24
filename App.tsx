import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'

import { LoginScreen } from "./src/LoginScreen";
import { ChatScreen } from './src/ChatScreen';
import { Pressable, Text } from 'react-native';

const StackNavigator = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName='Chat'
        // screenOptions={{ heade }}
      >
        <StackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options = {{
            headerShown: false
          }}
        />
        <StackNavigator.Screen
          name='Chat'
          component={ChatScreen}
          options = {{
            headerStyle : {
              backgroundColor: '#40ad40'
            },
            headerTitle: '',
            headerLeft: () => <Text>GDG Ajah</Text>,
            headerRight: () => <Pressable onPress = {() => auth().signOut()}><Text>Logout</Text></Pressable>
          }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default App;