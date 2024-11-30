import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FotoPerfil from "../../../Validacoes/FotoPerfil";
import API_CONFIG_URL from '.././../../Validacoes/ipConfig';

export default function PerfilCliente({ navigation }) {
  const [userAddress, setUserAddress] = useState(null); 
  const [userData, setUserData] = useState(null);  
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedData = JSON.parse(data);
          console.log("Dados armazenados no AsyncStorage:", parsedData);
  
          const idUsuario = parsedData.id;
  
          const response = await fetch(`${API_CONFIG_URL}usuarios/${idUsuario}/perfil`);
          const addressData = await response.json();
  
          console.log("Dados recebidos da API:", addressData);
  
          const fullUserData = {
            ...parsedData, 
            ...addressData,
          };
  
          await AsyncStorage.setItem('userData', JSON.stringify(fullUserData));
  
          setUserData(fullUserData); 
          setUserAddress(addressData); 
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
      }
    }
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    console.log("Dados completos do usuário no estado:", userData);
  }, [userData]);

  if (!userData || !userAddress) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FotoPerfil/>
          <Text style={styles.nomeCompleto}>{userData?.nome || ''}</Text>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={userData?.nome || ''}
            editable={false}
          />
    
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={userData?.sobrenome || 'Sobrenome não disponível'}  
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={userData?.emailLogin || ''}
            editable={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={userData?.telefone || ''}
            editable={false}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={userData?.cpf || ''}
            editable={false}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={userAddress?.cep || ''}
            editable={false}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={userAddress?.bairro || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={userAddress?.endereco || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Número Residencial"
            value={userData?.numResidencial ? String(userData.numResidencial) : 'Número Residencial não disponível'}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={userAddress?.complementoResi ? String(userData.complementoResi) : 'Complemento não disponível'}  
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={userAddress?.cidade || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={userAddress?.estado || ''}
            editable={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações da conta</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Trocar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EntrarLoginCliente')}>
            <Text style={[styles.link, styles.red]}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.link, styles.red]}>Excluir conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    paddingTop: 30,
  },
  nomeCompleto: {
    fontSize: 18,
    color: '#4E40A2',
    marginBottom: 10,
    marginTop:18
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#4E40A2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  link: {
    fontSize: 16,
    color: '#4E40A2',
    marginBottom: 10,
  },
  red: {
    color: 'red',
  },
});
