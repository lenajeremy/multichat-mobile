import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'

import { LoginScreen } from "./src/LoginScreen";
import { ChatScreen } from './src/ChatScreen';
import { Pressable, StyleSheet, Text } from 'react-native';

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
          options={{
            headerShown: false
          }}
        />
        <StackNavigator.Screen
          name='Chat'
          component={ChatScreen}
          options={{
            headerStyle: {
              backgroundColor: '#40ad40'
            },
            headerTitle: '',
            headerLeft: () => <Text style={styles.headingTitle}>GDG Ajah</Text>,
            headerRight: () => <Pressable onPress={() => auth().signOut()}><Text style={styles.headingRight}>Logout</Text></Pressable>
          }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  headingTitle: {
    marginLeft: 14,
    color: 'white',
    fontSize: 20
  },
  headingRight: {
    marginRight: 14,
    color: 'white'
  }
})