import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { connectWebSocket } from './websocket'; // Ajuste o caminho
import { useUser } from './UserContext'; // Ajuste o caminho

const Chat = () => {
    const { user } = useUser(); // Captura o usuário logado do contexto
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        const wsClient = connectWebSocket((newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        setClient(wsClient);

        return () => wsClient.deactivate();
    }, []);

    const sendMessage = () => {
        if (client && message && user) {
            client.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify({
                    messagemChat: message,
                    usuario: { idUsuario: user.id, tipo: user.tipo },
                }),
            });
            setMessage('');
        }
    };

    if (!user) {
        return <Text>Carregando usuário...</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.message}>
                        {item.usuario.tipo === 'cliente' ? 'Cliente' : 'Prestador'}: {item.messagemChat}
                    </Text>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem"
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Enviar" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
    message: { marginVertical: 5 },
});

export default Chat;
