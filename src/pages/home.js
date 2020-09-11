import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
  Text, 
  FlatList,
  TouchableOpacity,
  Image,
  View } from 'react-native';
import Axios from 'axios';
import TipoVeiculo from '../components/TipoVeiculo';

export default function Home({ navigation }) {

  const [data, setData] = useState('');
  const [tipoVericulo, setTipoVeiculo] = useState(0);

  const tpVeic = ['motos', 'carros', 'caminhoes'];

  const img = require('../../assets/brands/acura.png');

  useEffect(() => {
    buscaMarcas();
  }, []);

  const buscaMarcas = (tipo = 0) => {
    Axios.get(`http://www.fipeapi.appspot.com/api/1/${tpVeic[tipo]}/marcas.json`)
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const buscaImage = (brand) => {
    try{
      return require(`../../assets/brands/${brand}.png`)
    }catch(e){ return false }
  }

  const teste = () => {
    console.log(tipoVericulo);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2D2F79' style='light' />
      <View style={styles.content}>

        <TipoVeiculo 
          varVeic={tipoVericulo} 
          funcVeic={setTipoVeiculo}
          buscaMarcas={buscaMarcas} />
        
        <FlatList
          data={data}
          renderItem={({item}) => 
            <View 
              style={styles.divLista}>
              <TouchableOpacity
                style={[styles.divLista, {borderWidth: 0}]}
                onPress={teste}
              >
                <Image 
                  style={{width: 30, height: 30}} 
                  source={buscaImage(item.name.toLowerCase())} />
                <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2D2F79',
    alignItems: 'center',
    padding: 5, 
    paddingTop: 40,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  divLista: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 2,
    paddingHorizontal: 5,
  }
});