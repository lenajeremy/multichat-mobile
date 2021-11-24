import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
``

import { LoginScreen } from "./src/LoginScreen";
import { ChatScreen } from './src/ChatScreen';
import { Text } from 'react-native';
import Header from './src/components/Header';

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
            header: () => <Header/>
          }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default App;