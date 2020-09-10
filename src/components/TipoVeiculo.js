import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
    Text, 
    View,
    TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Home({ navigation }) {

    const [motos, setMotos] = useState(true);
    const [carros, setCarros] = useState(false);
    const [caminhoes, setCaminhoes] = useState(false);
    const [tipoVericulo, setTipoVeiculo] = useState(1);

    const checkMotos = () => {
        if(motos){
            setCarros(false);
            setCaminhoes(false);
            setTipoVeiculo(1);
        }else{
            setMotos(true);
            setCarros(false);
            setCaminhoes(false);
            setTipoVeiculo(1);
        }
    }

    const checkCarros = () => {
        if(carros){
            setMotos(false);
            setCaminhoes(false);
            setTipoVeiculo(2);
        }else{
            setMotos(false);
            setCarros(true);
            setCaminhoes(false);
            setTipoVeiculo(2);
        }
    }

    const checkCaminhoes = () => {
        if(caminhoes){
            setCarros(false);
            setMotos(false);
            setTipoVeiculo(3);
        }else{
            setMotos(false);
            setCarros(false);
            setCaminhoes(true);
            setTipoVeiculo(3);
        }
    }

    return (
        <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <TouchableOpacity
                style={[styles.button, motos ? styles.checked : false]}
                activeOpacity
                onPress={checkMotos}
            >
                <FontAwesome5 name="motorcycle" size={24} color="white" />
                <Text style={styles.textButton}>Motos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, carros ? styles.checked : false]}
                onPress={checkCarros}
            >
                <FontAwesome5 name="car-side" size={24} color="white" />
                <Text style={styles.textButton}>Carros</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, caminhoes ? styles.checked : false]}
                onPress={checkCaminhoes}
            >
                <FontAwesome5 name="truck" size={24} color="white" />
                <Text style={styles.textButton}>Caminhões</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
      height: 70,
      width: '32%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2D2F79',
      borderRadius: 5,
  }, 
  textButton: {
      color: '#fff',
  }, 
  checked: {
      backgroundColor: '#F15723',
  }
});