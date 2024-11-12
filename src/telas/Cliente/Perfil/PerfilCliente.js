import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function PerfilCliente({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // Função que busca os dados do backend ao montar o componente
  useEffect(() => {
      async function fetchUserData() {
          try {
              const token = await AsyncStorage.getItem('token');
              const response = await axios.get('http://192.168.0.7:8080/usuarios/{id}/perfil', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setUserData(response.data); // Dados do backend carregados no userData
          } catch (error) {
              console.error("Erro ao recuperar dados do usuário:", error);
          }
      }

      fetchUserData();
  }, []);

  const toggleEditable = () => {
      setIsEditable(!isEditable);
  };

  const salvarEdicao = () => {
      setIsEditable(false);
      // Implementar envio de dados para salvar alterações no backend, se necessário
  };

  // Renderização com os dados carregados automaticamente do backend
  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
              <View style={styles.header}>
                  <Image
                      source={{ uri: userData?.fotoPerfil || 'https://via.placeholder.com/100' }}
                      style={styles.profileImage}
                  />
                  <Text style={styles.nomeCompleto}>{userData?.nomeCompleto || ''}</Text>
                  <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
                  
                  <TouchableOpacity style={styles.editProfileButton} onPress={toggleEditable}>
                      <Text style={styles.editProfileButtonText}>Editar perfil</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="Nome"
                      value={userData?.nome || ''}
                      onChangeText={(text) => setUserData({...userData, nome: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Sobrenome"
                      value={userData?.sobrenome || ''}
                      onChangeText={(text) => setUserData({...userData, sobrenome: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="E-mail"
                      value={userData?.email || ''}
                      onChangeText={(text) => setUserData({...userData, email: text})}
                      editable={isEditable}
                      keyboardType="email-address"
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Telefone"
                      value={userData?.telefone || ''}
                      onChangeText={(text) => setUserData({...userData, telefone: text})}
                      editable={isEditable}
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
                      value={userData?.cep || ''}
                      onChangeText={(text) => setUserData({...userData, cep: text})}
                      editable={isEditable}
                      keyboardType="numeric"
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Bairro"
                      value={userData?.bairro || ''}
                      onChangeText={(text) => setUserData({...userData, bairro: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Endereço"
                      value={userData?.endereco || ''}
                      onChangeText={(text) => setUserData({...userData, endereco: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Número Residencial"
                      value={userData?.numero || ''}
                      onChangeText={(text) => setUserData({...userData, numero: text})}
                      editable={isEditable}
                      keyboardType="numeric"
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Complemento"
                      value={userData?.complemento || ''}
                      onChangeText={(text) => setUserData({...userData, complemento: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Cidade"
                      value={userData?.cidade || ''}
                      onChangeText={(text) => setUserData({...userData, cidade: text})}
                      editable={isEditable}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Estado"
                      value={userData?.estado || ''}
                      onChangeText={(text) => setUserData({...userData, estado: text})}
                      editable={isEditable}
                  />
              </View>

              {isEditable ? (
                  <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                      <Text style={styles.saveButtonText}>Salvar</Text>
                  </TouchableOpacity>
              ) : null}

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
        paddingTop: 30, // Mover a imagem de perfil para baixo
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },

    nomeCompleto: {
        fontSize: 18,
        color: '#4E40A2',
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
    },
    editProfileButton: {
        marginTop: 10,
        backgroundColor: '#4E40A2',
        padding: 10,
        borderRadius: 5,
    },
    editProfileButtonText: {
        color: '#FFF',
        fontSize: 16,
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
    saveButton: {
        backgroundColor: '#7B68EE',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
