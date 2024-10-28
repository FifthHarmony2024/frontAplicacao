import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ServicoPesq = ({ route }) => {
  // Verifique se route.params está definido
  const pesquisa = route.params?.pesquisa || 'O que a pessoa digitou xxxx'; // Define um valor padrão se não houver pesquisa

  const prestadores = [
    {
      id: '1',
      nome: 'Nome da Empresa 1',
      imagem: 'https://via.placeholder.com/150',
      categoria: 'GTD Estabele - Distância',
    },
    {
      id: '2',
      nome: 'Nome da Empresa 2',
      imagem: 'https://via.placeholder.com/150',
      categoria: 'GTD Estabele - Distância',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <View style={styles.imagemContainer}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="O que a pessoa digitou xxxx"
        value={pesquisa}
        editable={false} 
      />
      <FlatList
        data={prestadores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop:50
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'column',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoria: {
    fontSize: 14,
    color: '#89958F',
  },
  imagemContainer: {
    marginTop: 10,
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default ServicoPesq;
