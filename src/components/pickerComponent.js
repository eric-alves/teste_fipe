import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
    Text, 
    View,
    Picker,
    TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Home(props) {

    const [selectedValue, setSelectedValue] = useState();
    const [tipoVeiculo, setTipoVeiculo] = useState('motos');
    const [listMarcas, setListMarcas] = useState([]);
    const [marca, setMarca] = useState();
    const [listModelos, setListModelos] = useState([]);
    const [modelo, setModelo] = useState();
    const [listAnos, setListAnos] = useState([]);
    const [ano, setAno] = useState();
    let aux;

    useEffect(() => {
        buscaMarcas();
    }, []);

    const mudaModelo = (mod) => {
        setModelo(mod)
    }
    
    const imprime = () => {
        console.log('Marca = ', marca);
        console.log('Modelo = ', modelo);
        console.log('Ano = ', ano);
        buscaAnos(1);
    }

    const buscaMarcas = async () => {
        await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tipoVeiculo}/marcas.json`)
        .then(function (response) {
            setListMarcas(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const buscaModelos = async (id) => {
        await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tipoVeiculo}/veiculos/${id}.json`)
        .then(function (response) {
            setListModelos(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const buscaAnos = async (id) => {
        console.log('modelo = ' + modelo);
        await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tipoVeiculo}/veiculo/${marca}/${modelo}.json`)
        .then(function (response) {
            setListAnos(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <View style={[styles.container, {justifyContent: 'space-between'}]}>
            <Picker
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => 
                    {
                        setMarca(itemValue);
                        buscaModelos(itemValue);
                    }}
            >   
                <Picker.Item label='Escolha a marca' 
                        value={-1} 
                        key={-1} />;
                { listMarcas.map((item) => {
                    return <Picker.Item label={item.name} 
                            value={item.id} 
                            key={item.id} />;
                }) }
            </Picker>
            <Picker
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => 
                    {
                        mudaModelo(itemValue);
                        buscaAnos(itemValue);
                    }}
            >
                <Picker.Item label='Escolha o modelo' 
                        value={-1} 
                        key={-1} />;
                { listModelos.map((item) => {
                    return <Picker.Item label={item.name} 
                            value={item.id} 
                            key={item.id} />;
                }) }
            </Picker>
            <Picker
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => 
                    {
                        setAno(itemValue);
                        //buscaAnos(itemValue);
                    }}
            >
                <Picker.Item label='Escolha o ano' 
                        value={-1} 
                        key={-1} />;
                { listAnos.map((item) => {
                    return <Picker.Item label={item.name} 
                            value={item.id} 
                            key={item.id} />;
                }) }
            </Picker>
            <TouchableOpacity
                style={styles.button}
                onPress={imprime}
            >
                <Text>Press Here</Text>
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