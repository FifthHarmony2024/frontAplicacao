import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import imgPes from '../../../../assets/imgPesquisa.png';
import { Ionicons } from '@expo/vector-icons';

export default function BuscaPesquisa({ navigation }) {
  const handleSearch = () => {
    // Navega para a tela de busca 
    navigation.navigate('BuscaCliente', { pesquisa: 'O que a pessoa digitou xxxx' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Encontre um serviço</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Buscar" />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="options-outline" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <Text style={styles.cancelText}>Cancelar</Text>
      </View>

      <View style={styles.content}>
        <Image source={imgPes} style={styles.image} />
        <Text style={styles.mainText}>Qual é o serviço de hoje?</Text>
        <Text style={styles.subText}>Digite o serviço ou filtre o prestador desejado que você procura</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: "#7B68EE",
    padding: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  titulo: {
    fontSize: 25,
    color: "#FFF",
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterIcon: {
    fontSize: 18,
    color: '#7B68EE',
    marginHorizontal: 10,
  },
  cancelText: {
    color: '#7B68EE',
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
