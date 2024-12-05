import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatScreen = ({ route }) => {
    const { idUsuarioLogado, idUsuarioDestinatario } = route.params; // IDs do cliente e do prestador

    const [mensagens, setMensagens] = useState([]); // Armazena as mensagens do chat
    const [novaMensagem, setNovaMensagem] = useState(''); // Armazena a mensagem que será enviada
    const flatListRef = useRef(); // Referência para a FlatList

    const API_URL = 'http://192.168.0.6:8080/chat'; // Substitua pela URL do backend

    // Função para buscar mensagens enviadas pelo prestador para o cliente
    const buscarMensagens = async () => {
        try {
            const response = await fetch(`${API_URL}/cliente/${idUsuarioLogado}`); // A URL agora busca mensagens para o cliente
            if (response.ok) {
                const data = await response.json();
                console.log('Mensagens recebidas:', data); // Log para depuração

                // Filtra as mensagens entre o cliente e o prestador
                const mensagensFiltradas = data.filter(
                    (msg) =>
                        (msg.usuarioRemetente.idUsuario === idUsuarioDestinatario && // Prestador é o remetente
                            msg.usuarioDestinatario.idUsuario === idUsuarioLogado) || // Cliente é o destinatário
                        (msg.usuarioRemetente.idUsuario === idUsuarioLogado && // Cliente é o remetente
                            msg.usuarioDestinatario.idUsuario === idUsuarioDestinatario) // Prestador é o destinatário
                );

                // Ordena as mensagens pela data (do mais antigo para o mais recente)
                mensagensFiltradas.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                setMensagens(mensagensFiltradas);
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

    // Função para formatar a data e hora
    const formatarDataHora = (timestamp) => {
        const data = new Date(timestamp);
        return data.toLocaleString('pt-BR', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    // Renderiza uma mensagem na lista
    const renderItem = ({ item }) => {
        const isSentByMe = item.usuarioRemetente.idUsuario === idUsuarioLogado;
        return (
            <View style={[styles.message, isSentByMe ? styles.sentMessage : styles.receivedMessage]}>
                <Text style={[styles.messageText, isSentByMe ? styles.sentText : styles.receivedText]}>
                    {item.messagemChat}
                </Text>
                <Text style={styles.timestamp}>{formatarDataHora(item.timestamp)}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={mensagens}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                inverted={true} // Adiciona a propriedade inverted para inverter a lista
                onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Rola para o final quando a lista é atualizada
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
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#4E40A2', // Cor de fundo das mensagens enviadas
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#fff', // Cor de fundo das mensagens recebidas
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: '#fff', // Cor do texto das mensagens enviadas (branco)
  },
  receivedText: {
    color: '#000', // Cor do texto das mensagens recebidas (preto)
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ChatScreen;
