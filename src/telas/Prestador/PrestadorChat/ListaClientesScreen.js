import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import API_CONFIG_URL from '../../../Validacoes/ipConfig';

const ListaClientesScreen = ({ navigation, route }) => {
  const [mensagensAgrupadas, setMensagensAgrupadas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const idUsuario = route.params.idUsuarioLogado;

  const API_URL = `${API_CONFIG_URL}chat`;

  // Função para buscar mensagens do backend
  const buscarMensagens = async () => {
    try {
      const response = await fetch(`${API_URL}/prestador/${idUsuario}`);
      if (response.ok) {
        const data = await response.json();

        // Agrupar mensagens por outro usuário
        const mensagensAgrupadas = data.reduce((acc, msg) => {
          const outroUsuarioId =
            msg.usuarioRemetente.idUsuario === idUsuario
              ? msg.usuarioDestinatario.idUsuario
              : msg.usuarioRemetente.idUsuario;

          if (!acc[outroUsuarioId]) {
            acc[outroUsuarioId] = [];
          }
          acc[outroUsuarioId].push(msg);
          return acc;
        }, {});

        // Ordenar mensagens dentro de cada grupo
        const mensagensOrdenadas = Object.values(mensagensAgrupadas).map((grupo) =>
          grupo.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        );

        setMensagensAgrupadas(mensagensOrdenadas);
      } else {
        console.error('Erro ao buscar mensagens:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Atualizar mensagens periodicamente
  useEffect(() => {
    buscarMensagens();
    const intervalId = setInterval(buscarMensagens, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Função para marcar mensagens como lidas
  const atualizarStatusMensagem = async (idUsuarioDestinatario) => {
    try {
      await fetch(`${API_URL}/marcar-lida`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuarioPrestador: idUsuario,
          idUsuarioCliente: idUsuarioDestinatario,
        }),
      });
      buscarMensagens(); // Atualiza a lista após marcar como lida
    } catch (error) {
      console.error('Erro ao atualizar status da mensagem:', error);
    }
  };

  // Filtrar mensagens pela pesquisa
  const mensagensFiltradas = mensagensAgrupadas.filter((grupo) => {
    if (pesquisa) {
      const outroUsuario =
        grupo[0].usuarioRemetente.idUsuario === idUsuario
          ? grupo[0].usuarioDestinatario
          : grupo[0].usuarioRemetente;

      return outroUsuario.nome.toLowerCase().includes(pesquisa.toLowerCase());
    }
    return true;
  });

  // Renderizar cada item da lista
  const renderItem = ({ item }) => {
    const outroUsuario =
      item[0].usuarioRemetente.idUsuario === idUsuario
        ? item[0].usuarioDestinatario
        : item[0].usuarioRemetente;

    const ultimaMensagem = item[item.length - 1];

    const possuiMensagemNaoLida = item.some(
      (mensagem) =>
        mensagem.usuarioRemetente.idUsuario !== idUsuario && !mensagem.lida
    );

    return (
      <View style={styles.itemContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: outroUsuario.avatar || 'https://via.placeholder.com/50' }}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity
          style={styles.messageDetails}
          onPress={() => {
            atualizarStatusMensagem(outroUsuario.idUsuario);
            navigation.navigate('ChatPrestador', {
              idUsuarioLogado: idUsuario,
              idUsuarioDestinatario: outroUsuario.idUsuario,
            });
          }}
        >
          <Text style={styles.clientName}>{outroUsuario.nome}</Text>
          <Text style={styles.message} numberOfLines={1}>
            {ultimaMensagem.messagemChat}
          </Text>
        </TouchableOpacity>
        {possuiMensagemNaoLida && (
          <MaterialIcons
            name="circle"
            size={14}
            color="green"
            style={styles.newMessageIcon}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Conversas</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>
      <FlatList
        data={mensagensFiltradas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  searchContainer: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageDetails: {
    flex: 1,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#666',
    marginTop: 5,
  },
  newMessageIcon: {
    marginLeft: 10,
  },
});

export default ListaClientesScreen;
