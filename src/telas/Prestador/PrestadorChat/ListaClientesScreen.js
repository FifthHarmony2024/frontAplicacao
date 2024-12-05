import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ListaClientesScreen = ({ navigation, route }) => {
  const [mensagensAgrupadas, setMensagensAgrupadas] = useState([]);  // Mensagens agrupadas por cliente
  const idUsuario = route.params.idUsuarioLogado; // ID do prestador vindo da navegação ou contexto

  const API_URL = 'http://192.168.0.6:8080/chat'; // Substitua pela URL do backend

  // Função para buscar mensagens do prestador
  const buscarMensagens = async () => {
    try {
      const response = await fetch(`${API_URL}/prestador/${idUsuario}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Mensagens recebidas:', data);

        // Agrupar mensagens por cliente (usuarioRemetente.idUsuario)
        const mensagensAgrupadas = data.reduce((acc, msg) => {
          const clienteId = msg.usuarioRemetente.idUsuario;
          if (!acc[clienteId]) {
            acc[clienteId] = [];
          }
          acc[clienteId].push(msg);
          return acc;
        }, {});

        // Converter o objeto de mensagens agrupadas em um array
        setMensagensAgrupadas(Object.values(mensagensAgrupadas));
      } else {
        console.error('Erro ao buscar mensagens:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Carregar as mensagens assim que a tela for montada
  useEffect(() => {
    buscarMensagens();
  }, []);

  // Função para renderizar a lista de clientes e mensagens
  const renderItem = ({ item }) => {
    // Pegando o cliente (usuarioRemetente) da primeira mensagem do grupo
    const cliente = item[0].usuarioRemetente;
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => {
          // Navega para o chat com o cliente
          navigation.navigate('ChatPrestador', {
            idUsuarioLogado: idUsuario,  // ID do prestador
            idUsuarioDestinatario: cliente.idUsuario,  // ID do cliente
          });
        }}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.clientName}>{cliente.nome}</Text>
          {/* Exibindo a última mensagem do grupo */}
          <Text style={styles.message}>{item[item.length - 1].messagemChat}</Text>
          <Text style={styles.timestamp}>
            {new Date(item[item.length - 1].timestamp).toLocaleString('pt-BR')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensagensAgrupadas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  messageContainer: {
    padding: 5,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginVertical: 5,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default ListaClientesScreen;
