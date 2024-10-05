import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import logo from '../../assets/logo_home.png';
import nomeLogo from '../../assets/nome.png';

export default function Home({ navigation }) {
  return (
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Image source={logo} style={style.logo} resizeMode="contain" />
          <Text style={style.titulo}>Bem-Vindo ao</Text>
        </View>
        <Image source={nomeLogo} style={style.nome} resizeMode="contain" />
        <TouchableOpacity style={style.botao}>
          <Text style={style.botaoTexto} onPress={() => navigation.navigate('Perfil')}>Iniciar</Text>
        </TouchableOpacity>
      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E40A2',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  logo: {
    width: 190,
    height: 190,
    marginBottom: 10, 
  },
  titulo: {
    fontSize: 45,
    color: 'white',
    marginTop: 10, 
  },
  botao: {
    position: 'absolute',
    backgroundColor: '#FE914E',
    borderRadius: 50,
    alignSelf: 'center',
    width: '60%',
    height: '6%',
    paddingVertical: 8,
    bottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    fontSize: 25,
    color: '#F5F5F5',
  },
  nome: {
    width: 270,
    height: 270,
    marginTop: -90,
  },
});
