import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatPrestador = ({ route }) => {
  const { idUsuarioLogado, idUsuarioDestinatario } = route.params;  // IDs do prestador e do cliente
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const flatListRef = useRef(); // Referência para o FlatList

  const API_URL = 'http://192.168.0.6:8080/chat'; // Substitua pela URL do backend

  // Função para buscar mensagens
  const buscarMensagens = async () => {
    try {
      const response = await fetch(`${API_URL}/usuario/${idUsuarioDestinatario}`);
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

  // Função para enviar uma nova mensagem
  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    const mensagem = {
      messagemChat: novaMensagem,
      usuarioRemetente: { idUsuario: idUsuarioLogado },
      usuarioDestinatario: { idUsuario: idUsuarioDestinatario },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem),
      });

      if (response.ok) {
        const mensagemEnviada = await response.json();
        console.log('Mensagem enviada com sucesso:', mensagemEnviada);

        // Atualiza as mensagens
        setMensagens((prevMensagens) => {
          const mensagensAtualizadas = [...prevMensagens, mensagemEnviada];
          mensagensAtualizadas.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          return mensagensAtualizadas;
        });

        setNovaMensagem(''); // Limpa o campo de mensagem
        flatListRef.current.scrollToEnd({ animated: true }); // Rola para o final
      } else {
        console.error('Erro ao enviar mensagem:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Carregar as mensagens quando a tela for montada
  useEffect(() => {
    buscarMensagens();
  }, []);

  // Função para renderizar as mensagens
  const renderItem = ({ item }) => {
    const isSentByMe = item.usuarioRemetente.idUsuario === idUsuarioLogado;
    return (
      <View style={[styles.message, isSentByMe ? styles.sentMessage : styles.receivedMessage]}>
        <Text>{item.messagemChat}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Adiciona a referência
        data={mensagens}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Rola para o final quando o conteúdo mudar
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity onPress={enviarMensagem}>
          <Text style={styles.sendButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
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
  sendButton: {
    color: '#4E40A2',
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  sentMessage: {
    backgroundColor: '#FE914E',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
});

export default ChatPrestador;
