import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
  Text, 
  FlatList,
  SectionList,
  View } from 'react-native';
import Axios from 'axios';
import TipoVeiculo from '../components/TipoVeiculo';

export default function Home({ navigation }) {

  const [data, setData] = useState('');

  const tipoVeiculo = ['motos', 'carros', 'caminhoes'];

  useEffect(() => {
    Axios.get(`http://www.fipeapi.appspot.com/api/1/${tipoVeiculo[0]}/marcas.json`)
    .then(function (response) {
      console.log(response.data);
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2D2F79' style='light' />
      <View style={styles.content}>
        <TipoVeiculo />
      <FlatList
        data={data}
        renderItem={({item}) => 
          <Text style={styles.item}>
            {item.name + '... Key = ' + item.key}
          </Text>}
      />
      <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
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
});