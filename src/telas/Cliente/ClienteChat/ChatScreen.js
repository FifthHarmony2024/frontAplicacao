import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import API_CONFIG_URL from '../../../Validacoes/ipConfig'; 

const ChatScreen = ({ route,navigation }) => {
    const { idUsuarioLogado, idUsuarioDestinatario,  } = route.params;
    const [prestador, setPrestador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const flatListRef = useRef();


    const fetchPrestadorDetails = async () => {
        try {
            const response = await axios.get(`${API_CONFIG_URL}usuarios/${idUsuarioDestinatario}/perfilPrestador`);
            setPrestador(response.data);
        } catch (err) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do prestador.');
        } finally {
            setLoading(false);
        }
    };

    const buscarMensagens = async () => {
        try {
            const response = await fetch(`${API_CONFIG_URL}chat/usuario/${idUsuarioLogado}`);
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

    useEffect(() => {
        buscarMensagens();
        fetchPrestadorDetails();
    }, []);

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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack('DetalhesPrestador')}>
                    <Icon name="arrow-back" size={24} color="#000" style={styles.icon} />
                </TouchableOpacity>
                <Image
                    source={{
                        uri: prestador?.fotoPerfil
                            ? `${API_CONFIG_URL}${prestador.fotoPerfil.replace(/\\/g, '/')}`
                            : 'https://via.placeholder.com/150',
                    }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{prestador?.nomeComercial || 'Usuário'}</Text>
                <Icon name="more-vert" size={24} color="#000" style={styles.icon} />
            </View>

            <FlatList
                ref={flatListRef}
                data={mensagens}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
                inverted
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 80,
        marginTop:25
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10,
        marginTop:15
    },
    profileName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:14
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
    sendButton: {
        color: '#4E40A2',
        fontWeight: 'bold',
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

export default ChatScreen;
