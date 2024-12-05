import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import fotoPadrao from '../../../../assets/fotoPadrao.png';
import API_CONFIG_URL from '../../../Validacoes/ipConfig';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreen from '../ClienteChat/ChatScreen';

const DetalhesPrestador = ({ route, navigation }) => {
    const [prestador, setPrestador] = useState(null);
    const [postagens, setPostagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPostagens, setLoadingPostagens] = useState(true);
    const [expandedImage, setExpandedImage] = useState(null);
    const { idUsuario} = route.params || {}; 
    const [userAddress, setUserAddress] = useState(null); 
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const parsedData = JSON.parse(data);
                    console.log("Dados armazenados no AsyncStorage:", parsedData);
    
                    const idUsuario = parsedData.id;
    
                    const response = await fetch(`${API_CONFIG_URL}usuarios/${idUsuario}/perfil`);
                    const addressData = await response.json();
    
                    console.log("Dados recebidos da API:", addressData);
    
                    const fullUserData = {
                        ...parsedData, 
                        ...addressData,
                    };
    
                    await AsyncStorage.setItem('userData', JSON.stringify(fullUserData));
    
                    setUserData(fullUserData); 
                    setUserAddress(addressData); 
                }
            } catch (error) {
                console.error("Erro ao recuperar dados do usuário:", error);
            }
        }
    
        fetchUserData();
    }, []);
    
    useEffect(() => {
        if (!idUsuario) {
            Alert.alert('Erro', 'ID do prestador não foi fornecido.');
            return;
        }

        // Carregar detalhes do prestador
        const fetchPrestadorDetails = async () => {
            try {
                const response = await axios.get(`${API_CONFIG_URL}usuarios/${idUsuario}/perfilPrestador`);
                setPrestador(response.data);
            } catch (err) {
                Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do prestador.');
            } finally {
                setLoading(false);
            }
        };

        // Carregar postagens do prestador
        const fetchPostagens = async () => {
            try {
                const response = await axios.get(`${API_CONFIG_URL}postagens/prestador/${idUsuario}`);
                setPostagens(response.data);
            } catch (err) {
                Alert.alert('Erro', 'Ocorreu um erro ao carregar as postagens do prestador.');
            } finally {
                setLoadingPostagens(false);
            }
        };

        fetchPrestadorDetails();
        fetchPostagens();
    }, [idUsuario]);

    const BASE_URL = `${API_CONFIG_URL}`;
    const imageUrl = prestador?.fotoPerfil ? `${BASE_URL}${prestador.fotoPerfil.replace(/\\/g, '/')}` : null;

    const renderPostagem = ({ item }) => {
        const postagemUrl = item.url
            ? item.url.replace(/\\/g, '/').startsWith('http')
                ? item.url.replace(/\\/g, '/')
                : `${BASE_URL}${item.url.replace(/\\/g, '/')}`
            : null;

        return (
            <TouchableOpacity
                style={styles.postagemCard}
                onPress={() => setExpandedImage(postagemUrl)}
            >
                {postagemUrl ? (
                    <Image source={{ uri: postagemUrl }} style={styles.postagemImage} />
                ) : (
                    <Text style={styles.noImageText}>Imagem não disponível</Text>
                )}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#6200ee" style={styles.centered} />;
    }

    if (!prestador) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Prestador não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Image
                        source={imageUrl ? { uri: imageUrl } : fotoPadrao}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.name}>{prestador.nomeComercial || 'Nome não disponível'}</Text>
                        <Text style={styles.conquistas}>🏆 {prestador.conquistas || '0'} Conquistas</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Descrição</Text>
                <Text style={styles.text}>{prestador.descricaoServico || 'Nenhuma descrição disponível.'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Serviços que atende</Text>
                {prestador.nomeServico?.length ? (
                    prestador.nomeServico.map((nomeServico, index) => (
                        <Text key={index} style={styles.text}>
                            - {nomeServico}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.text}>Nenhum serviço registrado.</Text>
                )}
            </View>

            <View style={styles.catalogSection}>
                <Text style={[styles.sectionTitle, styles.catalogTitle]}>Catálogo</Text>
                {loadingPostagens ? (
                    <ActivityIndicator size="large" color="#6200ee" />
                ) : postagens.length > 0 ? (
                    <FlatList
                        data={postagens}
                        horizontal
                        keyExtractor={(item, index) => (item.idPostagem ? item.idPostagem.toString() : index.toString())}
                        renderItem={renderPostagem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.catalogList}
                    />
                ) : (
                    <Text style={styles.text}>Nenhuma postagem encontrada.</Text>
                )}
            </View>

            <Modal visible={!!expandedImage} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={() => setExpandedImage(null)}
                    >
                        <Icon name="x" size={30} color="#fff" />
                    </TouchableOpacity>
                    {expandedImage && (
                        <Image source={{ uri: expandedImage }} style={styles.modalImage} />
                    )}
                </View>
            </Modal>

            <View style={styles.chatContainer}>
                            <TouchableOpacity
                    onPress={() => {
                        if (!userData || !userData.id || !idUsuario) {
                            Alert.alert("Erro", "Informações do usuário ou prestador estão faltando.");
                            return;
                        }

                        // Navegar para a tela de chat passando os IDs
                        navigation.navigate('ChatCliente', {
                            idUsuarioLogado: userData.id, // ID do usuário logado
                            idUsuarioDestinatario: idUsuario, // ID do prestador
                        });
                    }}
                >
                    <Icons style={styles.chatIcon} name="chatbubbles-outline" size={70} color="#FE914E" />
                </TouchableOpacity>
                <Text style={styles.chatText}>Entrar em contato</Text>
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
        backgroundColor: '#4E40A2',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    conquistas: {
        fontSize: 14,
        color: '#fff',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4E40A2',
    },
    catalogTitle: {
        paddingRight: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    postagemCard: {
        width: 150,
        height: 150,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6C63FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    postagemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    catalogSection: {
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    catalogList: {
        paddingHorizontal: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
    modalClose: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
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

export default DetalhesPrestador;
