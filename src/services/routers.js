import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import Home from '../pages/home';
import Audio from '../../audio';
import TipoVeiculo from '../components/TipoVeiculo';
import ListModal from '../components/ModalSelectList';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Lista'>
      
      <Stack.Screen
        name="Lista"
        component={ListModal}
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