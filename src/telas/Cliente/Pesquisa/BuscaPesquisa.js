import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BuscaPesquisa() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
         <Text style={styles.titulo}>Encontre um Serviço</Text>

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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    
  },
  titulo: {
    fontSize: 25,
    color: "#FFF",
    alignItems: 'center',
  },
});
