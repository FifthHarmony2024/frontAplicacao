import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChatScreen({navigation}) {
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-back" size={25} color="#000" onPress={() => navigation.goBack('Conversas')} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <View style={styles.userProfileIcon}>
                        <FeatherIcon name="user" size={25} color="#4E40A2" />
                    </View>
                    <View>
                        <Text style={styles.userName}>Nome do Cliente</Text>
                        <Text style={styles.userStatus}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon name="ellipsis-vertical" size={25} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Chat Body */}
            <View style={styles.chatBody}>
                {/* Conteúdo do chat colocar aqui */}
            </View>

            {/* Input de mensagem */}
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Mensagem"
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="calendar" size={25} color="#4E40A2"  onPress={() => navigation.navigate('AgendaCHAT')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FeatherIcon name="paperclip" size={25} color="#4E40A2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FeatherIcon name="folder" size={25} color="#4E40A2" onPress={() => navigation.navigate('Agendamento')}  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton}>
                    <Icon name={message.trim() ? "send" : "mic"} size={25} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginTop: 35,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -115, 
        marginTop:10
    },
    userProfileIcon: {
        marginRight: 8,
        backgroundColor: '#E8E8E8',
        borderRadius: 25,
        padding: 5,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userStatus: {
        fontSize: 12,
        color: '#4CAF50',
    },
    chatBody: {
        flex: 1,
        backgroundColor: 'linear-gradient(#E3F2FD, #F0F4C3)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    messageInput: {
        flex: 2.8, 
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 5,
        backgroundColor: '#F0F0F0',
        height: 40, 
    },
    iconButton: {
        marginHorizontal: 5,
    },
    sendButton: {
        backgroundColor: '#4E40A2',
        borderRadius: 25,
        padding: 10,
    },
});
