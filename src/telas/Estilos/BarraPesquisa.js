import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const BarraPesquisa = () => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color="#000" style={styles.searchIcon} />

      <TextInput
        style={styles.input}
        placeholder="O que você precisa?"
        placeholderTextColor="#A9A9A9"
      />

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
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterIconContainer: {
    marginLeft: 10,
  },
});

export default BarraPesquisa;
