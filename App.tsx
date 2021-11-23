import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
``

import { LoginScreen } from "./src/LoginScreen";
import { ChatScreen } from './src/ChatScreen';

const StackNavigator = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName='Chat'
      >
        <StackNavigator.Screen
          name="Login"
          component={LoginScreen}
        />
        <StackNavigator.Screen
          name='Chat'
          component={ChatScreen}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default App;