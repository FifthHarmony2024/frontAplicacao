import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

const BarraPesquisa = ({ navigation, route = {} }) => {
  const { focus } = route?.params || {};
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
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={handleSearch}>
        <Feather name="search" size={20} color="#FE914E" style={styles.iconLeft} />
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="O que você precisa?"
        placeholderTextColor="#A9A9A9"
        ref={inputRef}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch} 
        returnKeyType="search" 
        autoFocus 
      />

      {searchTerm.trim() && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <AntDesign name="closecircle" size={20} color="#7B68EE" />
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.filterIconContainer}>
        <Ionicons name="options-outline" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 8, 
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  iconLeft: {
    marginRight: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  filterIconContainer: {
    marginLeft: 10,
  },
});

export default BarraPesquisa;
