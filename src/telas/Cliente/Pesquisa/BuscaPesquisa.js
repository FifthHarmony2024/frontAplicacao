import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

import imgPesquisa from '../../../../assets/imgPesquisa.png';

const BuscaPesquisa = ({ navigation, route }) => {
  const { focus } = route.params || {};
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [focus]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigation.navigate('ServicoPesq', { termoBusca: searchTerm });
    } else {
      Alert.alert('Busca vazia', 'Por favor, digite algo para buscar.');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#4E40A2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Encontre um serviço</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleSearch}>
          <Feather name="search" size={20} color="#FE914E" style={styles.iconLeft} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch} 
          returnKeyType="search" 
          autoFocus 
        />
        {searchTerm.trim() ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <AntDesign name="closecircle" size={20} color="#7B68EE" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="options-outline" size={20} color="#7B68EE" style={styles.iconRight} />
        )}
      </View>

      <View style={styles.content}>
        <Image source={imgPesquisa} style={styles.image} />
        <Text style={styles.description}>
          Qual é o serviço de hoje?{'\n'}
          Digite o serviço ou filtre o prestador desejado.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E40A2',
    marginLeft: 10, 
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: -30,
  },
});

export default BuscaPesquisa;
