import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/home';
import Audio from '../../audio';
import TipoVeiculo from '../components/TipoVeiculo';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24},
          headerTintColor: '#000',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <Stack.Screen
        name="Audio"
        component={Audio}
        options={{
          headerShown:false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24},
          headerTintColor: '#000',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <Stack.Screen
        name="TipoVeiculo"
        component={TipoVeiculo}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24},
          headerTintColor: '#000',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}