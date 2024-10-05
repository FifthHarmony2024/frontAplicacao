import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import lgPerfil from '../../../assets/logoPerfil.png';

export default function Perfil({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.blocoFundo}>
        <Text style={styles.titulo}>Selecione o</Text>
        <Text style={styles.tituloDestaque}>Tipo de Perfil:</Text>
      </View>

      <TouchableOpacity 
          style={styles.botao}
          onPress={() => navigation.navigate('EntrarLoginCliente')}
        >
          <Text style={styles.botaoUsuario}>Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('EntrarLoginPrestador')}
      >
        <Text style={styles.botaoUsuario}>Prestador de serviço</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={lgPerfil} style={styles.lgPerfil} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  blocoFundo: {
    backgroundColor: '#F0EBE0', 
    width: '100%',              
    paddingVertical: 90,        
    paddingHorizontal: 10,     
    alignItems: 'center',      
    justifyContent: 'center',   
    borderRadius: 0,            
    marginBottom: 30,          
    shadowColor: "#000",      
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,   
    marginTop:-300    
  },
  titulo: {
    fontSize: 33,
    fontWeight: '400',
    color: '#282828',          
  },
  tituloDestaque: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#282828',           
  },
  botao: {
    backgroundColor: '#4E40A2',
    borderRadius: 10,
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  botaoUsuario: {
    fontSize: 23,
    color: '#F5F5F5',
  },
  logoContainer: {
    position: 'absolute', 
    bottom: -80, 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  lgPerfil: {
    width: 300,
    height:300,
  }
});
