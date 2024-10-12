import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icones from 'react-native-vector-icons/Feather'; 
import Icons from 'react-native-vector-icons/Ionicons';
import NotIcone from 'react-native-vector-icons/MaterialCommunityIcons';


export default function PerfilPrestador({ navigation }) {
    const [showNotification, setShowNotification] = useState(true);
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

                {/* Navegação entre páginas */}
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

                {/* Conteúdo que será rolado */}
                <View style={styles.content}>
                    {/* para adiconar os pedidos ou outro conteúdo que será rolável */}
                </View>
            </ScrollView>

            <View style={styles.chatContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Conversas')}>
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
