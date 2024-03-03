import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { BusquedaContext } from './BusquedaContext';

export const Gifts = ({ route }) => {
  const [gifs, setGifs] = useState([]);
  const { historial, agregarHistorial } = useContext(BusquedaContext);
  const busquedaInicial = route.params?.busqueda;

  useEffect(() => {
    if (busquedaInicial) {
      fetchGifs(busquedaInicial);
    }
  }, [busquedaInicial]);

  const fetchGifs = async (busqueda) => {
    const apiKey = 'gAx8neButlCTLpGenSaJjFjkAPSqsnRq';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=50`;

    try {
      const response = await axios.get(url);
      const gifs = response.data.data.map(item => {
        return { id: item.id, url: item.images.fixed_height.url };
      });
      setGifs(gifs);
      if (!historial.includes(busqueda)) {
        agregarHistorial(busqueda);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleHistorialPress = (item) => {
    fetchGifs(item); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.historialTitulo}>Historial de Búsqueda:</Text>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHistorialPress(item)}>
            <Text style={styles.historialItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} 
        style={styles.historialList}
      />
      <FlatList
        data={gifs}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  historialTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  historialItem: {
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  historialList: {
    height: 60,
  },
  image: {
    flex: 1,
    height: 200,
    margin: 5,
  },
});
