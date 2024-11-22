import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function BuscaPesquisa() {
  const [searchTerm, setSearchTerm] = useState(''); // Armazena o termo de busca
  const [prestadores, setPrestadores] = useState([]); // Armazena a lista de prestadores
  const [loading, setLoading] = useState(false); // Estado para exibir carregamento

  const fetchPrestadores = async () => {
    if (searchTerm.trim() === '') {
      alert('Por favor, insira um termo para buscar.');
      return;
    }
  
    setLoading(true);
    setPrestadores([]); // Limpa a lista anterior enquanto busca
  
    try {
      // Corrigindo a URL para incluir o parâmetro 'termo'
      const response = await fetch(`http://192.168.0.3:8080/usuarios/prestadores/buscar-termo?termo=${encodeURIComponent(searchTerm)}`);
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const data = await response.json();
        setPrestadores(data);
      } else if (response.status === 404) {
        setPrestadores([]);
        alert('Nenhum prestador encontrado para o termo informado.');
      } else {
        alert('Erro ao buscar prestadores. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error);
      alert('Erro ao buscar prestadores. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nomeComercial}</Text>
      <Text style={styles.categoria}>{item.categoria.nomeCategoria}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Prestadores</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" style={styles.iconLeft} />
        <TextInput
          style={styles.input}
          placeholder="Digite o que você precisa"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm} // Atualiza o termo de busca
        />
        <TouchableOpacity onPress={fetchPrestadores}>
          <Ionicons name="search" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7B68EE" style={styles.loading} />
      ) : (
        <FlatList
          data={prestadores}
          renderItem={renderItem}
          keyExtractor={(item) => item.idUsuario.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum resultado encontrado</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoria: {
    fontSize: 14,
    color: '#89958F',
  },
  loading: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#89958F',
    fontSize: 16,
  },
});
