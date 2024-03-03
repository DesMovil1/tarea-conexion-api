import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BusquedaContext } from './BusquedaContext';

export const Busqueda = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const navigation = useNavigation();
  const { agregarHistorial, historial } = useContext(BusquedaContext);

  const handleBuscar = (busqueda) => {
    agregarHistorial(busqueda);
    navigation.navigate('Gifts', { busqueda: busqueda });
    setTextoBusqueda('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historialItem}
      onPress={() => handleBuscar(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTextoBusqueda}
        value={textoBusqueda}
        placeholder="Buscar GIFs"
        onSubmitEditing={() => handleBuscar(textoBusqueda)}
      />
      <TouchableOpacity onPress={() => handleBuscar(textoBusqueda)} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Historial de búsqueda</Text>
      <FlatList
        data={historial}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={styles.historialContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  titulo: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  historialContainer: {
    marginTop: 20,
    width: '100%',
  },
  historialItem: {
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50, 
  },
});
