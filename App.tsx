import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from "./src/LoginScreen";

const StackNavigator = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName ='Login'
      >
        <StackNavigator.Screen 
          name="Login" 
          component={LoginScreen} 
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default App;