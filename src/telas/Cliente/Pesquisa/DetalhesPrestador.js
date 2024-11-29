import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import fotoPadrao from '../../../../assets/fotoPadrao.png';

const DetalhesPrestador = ({ route }) => {
    const { idUsuario } = route.params;
    const [prestador, setPrestador] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('idUsuario recebido:', idUsuario);  // Verifique se o ID está sendo passado corretamente

        const fetchPrestadorDetails = async () => {
            if (!idUsuario) {
                Alert.alert('Erro', 'ID do prestador não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://192.168.0.5:8080/usuarios/prestadores/${idUsuario}`);
                console.log('Detalhes do prestador:', response.data);
                setPrestador(response.data);
            } catch (err) {
                console.error('Erro ao buscar detalhes do prestador:', err);
                Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do prestador. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchPrestadorDetails();
    }, [idUsuario]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
    }

    if (!prestador) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Prestador não encontrado.</Text>
            </View>
        );
    }

    const baseUrl = 'http://192.168.0.5:8080/';
    const imageUrl = prestador.fotoPerfil ? `${baseUrl}${prestador.fotoPerfil.replace(/\\/g, '/')}` : null;

    return (
        <View style={styles.container}>
            <Image
                source={imageUrl ? { uri: imageUrl } : fotoPadrao}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{prestador.nomeComercial || 'Nome não disponível'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    error: {
        fontSize: 18,
        color: '#ff6347',
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DetalhesPrestador;
