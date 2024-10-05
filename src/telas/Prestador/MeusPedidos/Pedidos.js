import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Icones from 'react-native-vector-icons/Feather'; 

export default function PerfilPrestador({navigation}) {
    return (
        <View style={styles.container}>                
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icones name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Notificações!')}>
                        <Icones
                            style={styles.notificacao}
                            name="bell"
                            size={28}
                            color="#fff"
                        />
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
                <TouchableOpacity style={styles.navButton}  onPress={() => navigation.navigate('Minha Agenda')}>
                    <Text style={styles.navText}>Agenda</Text>
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
        paddingTop:12
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#4E40A2', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:-5
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
   
});
