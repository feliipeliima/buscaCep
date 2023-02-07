import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const refInput = useRef(null);

  async function buscar() {
    if (cep == "") {
      alert('Digite um cep válido!');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setAddress(response.data);
      Keyboard.dismiss();
    }
    catch (error) {
      console.log(`ERROR: ${error}`);
    }

  }

    function limpar() {
      setCep('');
      setAddress(null);
      refInput.current.focus();
    }

  return (

    <SafeAreaView style={styles.container}>

      <Image
        style={styles.img}
        source={require('./src/img/location.jpg')}
      />

      <View style={styles.areaInput}>
        <Text style={styles.titulo}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => setCep(texto)}
          value={cep}
          placeholder="Ex: 51700935"
          keyboardType='numeric'
          ref={refInput}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#2167AD' }]} onPress={buscar}>
          <Text style={styles.textoBtn}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#AD1915', }]} onPress={limpar}>
          <Text style={styles.textoBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {address &&
        <View style={styles.result}>
          <Text style={styles.itemText}>CEP: {address.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {address.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {address.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {address.localidade}</Text>
          <Text style={styles.itemText}>Estado: {address.uf}</Text>
        </View>
      }

    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 270,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titulo: {
    marginTop: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  areaInput: {
    marginTop: 10
  },
  input: {
    height: 55,
    margin: 20,
    borderColor: '#c7c7c7', //'#5D89F0',
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 18,
    padding: 10,
    color: '#616161',
    fontWeight: 'bold',
  },
  areaBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  btn: {
    alignItems: 'center',
    height: 50,
    width: 100,
    borderRadius: 5,
    padding: 10,
  },
  textoBtn: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700'
  },
  result: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 12
  },
  itemText: {
    fontSize: 22,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
})
