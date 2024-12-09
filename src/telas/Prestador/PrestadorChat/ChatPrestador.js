import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_CONFIG_URL from '../../../Validacoes/ipConfig';

const ChatPrestador = ({ route, navigation }) => {
  const { idUsuarioLogado, idUsuarioDestinatario, clienteInfo } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [cliente, setCliente] = useState(clienteInfo || null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      if (!clienteInfo) {
        await buscarPerfilCliente();
      }
      await buscarMensagens();
      setLoading(false);
    };

    carregarDados();
  }, [clienteInfo]);

  const buscarPerfilCliente = async () => {
    try {
      const response = await fetch(`${API_CONFIG_URL}usuarios/${idUsuarioDestinatario}/perfil`);
      if (response.ok) {
        const data = await response.json();
        setCliente(data);
      } else {
        console.error('Erro ao buscar perfil do cliente:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const buscarMensagens = async () => {
    try {
      const response = await fetch(`${API_CONFIG_URL}chat/usuario/${idUsuarioDestinatario}`);
      if (response.ok) {
        const data = await response.json();
        const mensagensFiltradas = data
          .filter(
            (msg) =>
              (msg.usuarioRemetente.idUsuario === idUsuarioDestinatario &&
                msg.usuarioDestinatario.idUsuario === idUsuarioLogado) ||
              (msg.usuarioRemetente.idUsuario === idUsuarioLogado &&
                msg.usuarioDestinatario.idUsuario === idUsuarioDestinatario)
          )
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMensagens(mensagensFiltradas);
      } else {
        console.error('Erro ao buscar mensagens:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    const mensagem = {
      messagemChat: novaMensagem,
      usuarioRemetente: { idUsuario: idUsuarioLogado },
      usuarioDestinatario: { idUsuario: idUsuarioDestinatario },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_CONFIG_URL}chat/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem),
      });

      if (response.ok) {
        const mensagemEnviada = await response.json();
        setMensagens((prevMensagens) => {
          const mensagensAtualizadas = [mensagemEnviada, ...prevMensagens];
          return mensagensAtualizadas.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
        setNovaMensagem('');
      } else {
        console.error('Erro ao enviar mensagem:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const formatarDataHora = (timestamp) => {
    const data = new Date(timestamp);
    return data.toLocaleString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E40A2" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  const clienteFoto = cliente?.fotoPerfil ? `${API_CONFIG_URL}${cliente.fotoPerfil.replace(/\\/g, '/')}` : 'https://via.placeholder.com/150';
  const clienteNome = cliente?.nome || 'Usuário';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <Image source={{ uri: clienteFoto }} style={styles.profileImage} />
        <Text style={styles.profileName}>{clienteNome}</Text>
        <Icon name="more-vert" size={24} color="#000" style={styles.icon} />
      </View>

      <FlatList
        ref={flatListRef}
        data={mensagens}
        renderItem={({ item }) => {
          const isSentByMe = item.usuarioRemetente.idUsuario === idUsuarioLogado;
          return (
            <View style={[styles.message, isSentByMe ? styles.sentMessage : styles.receivedMessage]}>
              <Text style={[styles.messageText, isSentByMe ? styles.sentText : styles.receivedText]}>{item.messagemChat}</Text>
              <Text style={styles.timestamp}>{formatarDataHora(item.timestamp)}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        inverted
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('AgendaCHAT')} >
          <Icon name="date-range" size={24} color="#4E40A2" />
        </TouchableOpacity>
       
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={enviarMensagem}>
          <Icon name="send" size={24} color="#4E40A2" />
        </TouchableOpacity>
      </View>
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 80,
    marginTop: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 15,
  },
  profileName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
  },
  icon: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  message: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#4E40A2',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: '#fff',
  },
  receivedText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ChatPrestador;
