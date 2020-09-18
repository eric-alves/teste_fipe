import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from "react-native";
import Axios from 'axios';

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');

  const tpVeic = ['motos', 'carros', 'caminhoes'];

  const buscaMarcas = async (tipo = 0) => {
    const resp = await Axios.get(`http://www.fipeapi.appspot.com/api/1/${tpVeic[1]}/marcas.json`);
    setData(resp);
  };

  const buscaImage = (brand) => {
      const teste = brand;
    try{
        //console.warn(String(brand))
      return require('../../assets/images/back_button.png')
    }catch(e){ return require('../../assets/images/back_button.png') }
  }

  useEffect(() => {
    buscaMarcas();
  }, []);


  return (
    <View style={styles.centeredView}>
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            <View style={{width: '100%', height: '100%', marginHorizontal: 5}}>
            <FlatList
            data={data}
            renderItem={({item}) => 
                <View 
                style={styles.divLista}>
                <TouchableOpacity
                    style={[styles.divLista, {borderWidth: 0}]}
                >
                    {/* <Image 
                        style={{width: 30, height: 30}} 
                        source={buscaImage(item.name.toLowerCase())} /> */}
                    <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
                </View>
            }
            />
            </View>
        </Modal>

        <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
            setModalVisible(true);
            }}
        >
            <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
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

export default App;