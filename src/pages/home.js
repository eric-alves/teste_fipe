import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
  Text, 
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Picker,
  View,
  Modal,
  Alert } from 'react-native';
import Axios from 'axios';
import TipoVeiculo from '../components/TipoVeiculo';
import brands from '../services/brands';

export default function Home({ navigation }) {

  const [data, setData] = useState([]);
  const [tipoVericulo, setTipoVeiculo] = useState(0);
  const [marca, setMarca] = useState();
  const [listaModelos, setListaModelos] = useState([]);
  const [modelo, setModelo] = useState();
  const [listaAnos, setListaAnos] = useState([]);
  const [ano, setAno] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const tpVeic = ['motos', 'carros', 'caminhoes'];

  const img = require('../../assets/brands/acura.png');

  const testImg = 'bmw';

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

  const buscaModelos = async (tipo = 0, marca) => {
    await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tpVeic[tipo]}/veiculos/${marca}.json`)
    .then(function (response) {
        setListaModelos(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const buscaAnos = async (tipo = 0, marca, modelo) => {
    await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tpVeic[tipo]}/veiculo/${marca}/${modelo}.json`)
    .then(function (response) {
        setListaAnos(response.data);
        console.log('func')
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const buscaImage = (brand) => {
    console.log(brand);

    if(brand){
      try{
        return brands[brands[brand]];
      }catch(e){ 
        return brands['bmw'];
      }
    }else {
      return require(`../../assets/brands/${'bmw'}.png`);
    }

    /* try{
      return require(`../../assets/brands/${brand}.png`);
    }catch(e){ return require(`../../assets/brands/${'audi'}.png`) } */
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

        <Picker
          style={{ height: 50, width: '100%', marginTop: 20 }}
          selectedValue={marca}
          onValueChange={(itemValue) => 
            {
              setMarca(itemValue);
              buscaModelos(tipoVericulo, itemValue);
            }}
        >   
          <Picker.Item label='Escolha a marca' />
          { data.map((item) => {
              return <Picker.Item label={item.name} 
                      value={item.id} 
                      key={item.id} />;
          }) }
        </Picker>
        
        {marca ?
          <Picker
            style={{ height: 50, width: '100%', marginTop: 20 }}
            selectedValue={modelo}
            onValueChange={(itemValue) => 
              {
                setModelo(itemValue);
                buscaAnos(tipoVericulo, marca, itemValue);
              }}
          >   
            <Picker.Item label='Escolha a marca' /> 
            { listaModelos.map((item) => {
                return <Picker.Item label={item.name} 
                        value={item.id} 
                        key={item.id} />;
            }) }
          </Picker> : <View />
        }

        {modelo ?
          <Picker
            style={{ height: 50, width: '100%', marginTop: 20 }}
            selectedValue={ano}
            onValueChange={(itemValue) => 
              {
                setAno(itemValue);
                //buscaModelos(itemValue);
              }}
          >   
            <Picker.Item label='Escolha o ano' />
            { listaAnos.map((item) => {
                return <Picker.Item label={item.name} 
                        value={item.id} 
                        key={item.id} />;
            }) }
          </Picker> : <View />
        }

        {marca ? <Text>{'Marca = ' + marca}</Text> : <Text>Marca = </Text>}
        {modelo ? <Text>{'Modelo = ' + modelo}</Text> : <Text>Modelo = </Text>}
        {ano ? <Text>{'Ano = ' + ano}</Text> : <Text>Ano = </Text>}

        <View style={{alignItems: 'center', 
          justifyContent: 'center',
          width: '100%'}}>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(false);
            }}
          >
            <View style={{width: '95%', 
                height: '100%', 
                marginHorizontal: 5,
                backgroundColor: 'white'}}>
              <FlatList
              data={data}
              renderItem={({item}) => 
                  <View 
                  style={styles.divLista}>
                  <TouchableOpacity
                      style={[styles.divLista, {borderWidth: 0}]}
                  >
                    <Image 
                      style={{width: 30, height: 30}} 
                      source={buscaImage(item.name.toLowerCase())}
                      /* source={require(`../../assets/brands/${}.png`)} *//>
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableOpacity>
                  </View>
              }
              />
            </View>
          </Modal>
        </View>

        <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              setModalVisible(true);
            }}
        >
            <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
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
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});