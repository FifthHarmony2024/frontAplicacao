import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function PesquisaClie({ navigation }) {
  const categorias = [
    { label: 'Assistência Técnica', icon: { type: FontAwesome, name: 'gears' } },
    { label: 'Aulas', icon: { type: FontAwesome5, name: 'book' } },
    { label: 'Eventos', icon: { type: FontAwesome5, name: 'glass-cheers' } },
    { label: 'Saúde', icon: { type: FontAwesome5, name: 'heart' } },
    { label: 'Reformas e Reparos', icon: { type: Ionicons, name: 'construct-outline' } },
    { label: 'Serviços Gerais', icon: { type: FontAwesome5, name: 'briefcase' } },
    { label: 'Serviços Domésticos', icon: { type: Ionicons, name: 'home' } },
    { label: 'Transporte', icon: { type: FontAwesome5, name: 'car' } },
    { label: 'Moda e Beleza', icon: { type: FontAwesome5, name: 'cut' } },
  ];

  const handleSearchPress = () => {
    navigation.navigate('PesquisaBusca'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buscar}>Buscar</Text>
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Feather name="search" size={24} color="black" style={styles.iconLeft} />
        <TextInput
          style={styles.input}
          placeholder="O que você precisa?"
          placeholderTextColor="#999"
          editable={false} // Não permite edição
        />
        <Ionicons name="options-outline" size={24} color="black" style={styles.iconRight} />
      </TouchableOpacity>

      <View style={styles.buscartitulo}>
        <Text style={styles.titulo}>Todas as Categorias</Text>
      </View>

      <ScrollView contentContainerStyle={styles.categoriasContainer}>
        {categorias.map((categoria, index) => (
          <TouchableOpacity key={index} style={styles.categoria}>
            <categoria.icon.type name={categoria.icon.name} size={24} color="#7B68EE" />
            <Text style={styles.categoriaTexto}>{categoria.label}</Text>
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
    marginTop: 20,
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
    marginBottom: 10,
    marginRight: 120,
    color: '#333',
    textAlign: 'right',
  },
  buscar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E40A2',
    textAlign: 'right',
    marginRight: 290,
    marginTop: 30,
  },
  buscartitulo: {
    marginRight: -20,
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
    color: '#89958F',
    textAlign: 'center',
    marginTop: 5,
  },
});
