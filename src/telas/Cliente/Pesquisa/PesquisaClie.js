import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PesquisaClie({ navigation }) {
  const categorias = [
    { id: 1, nome: 'Informática e Telefonia' },
    { id: 2, nome: 'Assistência Técnica' },
    { id: 3, nome: 'Eletrodomésticos' },
    { id: 4, nome: 'Beleza' },
    { id: 5, nome: 'Reforma e Reparos' },
    { id: 6, nome: 'Serviços Domésticos' },
    { id: 7, nome: 'Para a família' },
    { id: 8, nome: 'Esportes' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.buscar}>Buscar</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" style={styles.iconLeft} />
        <TextInput
          style={styles.input}
          placeholder="O que você precisa?"
          placeholderTextColor="#999"
        />
        <Ionicons name="options-outline" size={24} color="black" style={styles.iconRight} />
      </View>

      <Text style={styles.titulo}>Todas Categorias</Text>

      <ScrollView contentContainerStyle={styles.categoriasContainer}>
        {categorias.map((categoria) => (
          <TouchableOpacity key={categoria.id} style={styles.categoria}>
            <Text style={styles.categoriaTexto}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    marginTop:60
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buscar:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', 
    marginTop:100
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoria: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  categoriaTexto: {
    fontSize: 14,
    color: '#7B68EE',
    textAlign: 'center',
  },
});
