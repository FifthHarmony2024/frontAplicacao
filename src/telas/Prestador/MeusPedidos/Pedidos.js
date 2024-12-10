import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Icones from 'react-native-vector-icons/Feather'; 
import Icons from 'react-native-vector-icons/Ionicons';
import NotIcone from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilPrestador({ navigation }) {
    const [showNotification, setShowNotification] = useState(true);
    const [userData, setUserData] = useState(null);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    setUserData(JSON.parse(data));
                } else {
                    Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados do usuário:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do usuário.');
            }
        }

        async function fetchAgendamentos() {
            try {
                const storedAgendamentos = await AsyncStorage.getItem('agendamentos');
                if (storedAgendamentos) {
                    setAgendamentos(JSON.parse(storedAgendamentos));
                }
            } catch (error) {
                console.error('Erro ao recuperar os agendamentos:', error);
            }
        }

        fetchUserData();
        fetchAgendamentos();
    }, []);

    const handleNavigateToListaClientes = () => {
        if (userData && userData.id) {
            navigation.navigate('ListaClientes', { idUsuarioLogado: userData.id });
        } else {
            Alert.alert('Erro', 'ID do usuário não encontrado.');
        }
    };

    return (
        <View style={styles.container}> 
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icones name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
                        <Icones style={styles.notificacao} name="bell" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.navbar}>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Início')}>
                        <Text style={styles.navText}>Meu Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Text style={styles.navTextActive}>Meus Pedidos</Text>
                        <View style={styles.navIndicator} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Minha Agenda')}>
                        <Text style={styles.navText}>Agenda</Text>
                    </TouchableOpacity>
                </View>

                {showNotification && (
                    <View style={styles.notification}>
                        <NotIcone name="information-outline" size={25} color="black"/>                            
                        <Text style={styles.notificationText}>
                            Abaixo você encontra os seus pedidos. Clique neles para ver os detalhes.
                        </Text>
                        <TouchableOpacity onPress={() => setShowNotification(false)}>
                            <Icons name="close" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Content: Agendamentos List */}
                <View style={styles.content}>
                    {agendamentos.length > 0 ? (
                        agendamentos.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.agendamentoCard} onPress={() => navigation.navigate('Agendamento', { date: item.dtAgendamento })}>
                                <Text style={styles.agendamentoTitle}>{item.nomeCliente}</Text>
                                <Text style={styles.agendamentoText}>Hora: {item.hrAgendamento}</Text>
                                <Text style={styles.agendamentoText}>Endereço: {item.endereco}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noAgendamentosText}>Nenhum agendamento encontrado.</Text>
                    )}
                </View>
            </ScrollView>

            <View style={styles.chatContainer}>
                <TouchableOpacity onPress={handleNavigateToListaClientes}>
                    <Icons style={styles.chatIcon} name="chatbubbles-outline" size={70} color="#FE914E" />
                </TouchableOpacity>
                <Text style={styles.chatText}>Entrar no Chat</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', 
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100, 
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4E40A2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 60, 
    },
    notificacao: {
        marginRight: 10,
        paddingTop: 12
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#4E40A2', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -5
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    navTextActive: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navIndicator: {
        marginTop: 5,
        width: '100%',
        height: 3,
        backgroundColor: '#FE914E',
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        padding: 12,
        margin: 10,
        borderRadius: 5,
    },
    notificationText: {
        color: '#282828',
        flex: 1,
        marginLeft:15,
    },
    content: {
        padding: 20,
    },
    agendamentoCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    agendamentoTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    agendamentoText: {
        fontSize: 14,
        color: "#555",
    },
    noAgendamentosText: {
        fontSize: 16,
        textAlign: 'center',
        color: "#888",
    },
    chatContainer: {
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        alignItems: 'center',
    },
    chatText: {
        color: '#FE914E',
        marginTop: 5,
    },
});
