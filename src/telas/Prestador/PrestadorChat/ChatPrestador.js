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
        setMensagens(data);
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
        setMensagens((prevMensagens) => [...prevMensagens, mensagemEnviada]);
        setNovaMensagem('');
        flatListRef.current.scrollToEnd({ animated: true });
      } else {
        console.error('Erro ao enviar mensagem:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isSentByMe = item.usuarioRemetente.idUsuario === idUsuarioLogado;
    return (
      <View style={[styles.message, isSentByMe ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{item.messagemChat}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    );
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
        <Image
          source={{ uri: clienteFoto }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{clienteNome}</Text>
        <Icon name="more-vert" size={24} color="#000" style={styles.icon} />
      </View>

      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={mensagens}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
      </View>

      <View style={styles.inputContainer}>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    top:45
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  profileName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#FE914E',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatPrestador;
