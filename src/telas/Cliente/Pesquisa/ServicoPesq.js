import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import fotoPadrao from '../../../../assets/fotoPadrao.png';
import API_CONFIG_URL from '../../../Validacoes/ipConfig';

const ServicoPesq = ({ route, navigation }) => {
    const { termoBusca } = route.params; 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState({}); 
    const [searchTerm, setSearchTerm] = useState(termoBusca || '');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `${API_CONFIG_URL}usuarios/prestadores/buscar-termo?termo=${searchTerm}`
                );
                console.log('Dados retornados pela API:', response.data);
                setResults(response.data); 

            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.warn('Nenhum prestador encontrado.');
                    setResults([]); 
                } else {
                    console.error('Erro ao buscar dados:', err);
                    Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
                }
            } finally {
                setLoading(false);
            }
        };
    
        if (searchTerm.trim()) {
            fetchResults();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [searchTerm]);
    
    
    

    const toggleFavorito = (id) => {
        setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigation.navigate('ServicoPesq', { termoBusca: searchTerm });
        } else {
            Alert.alert('Busca vazia', 'Por favor, digite algo para buscar.');
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const renderItem = ({ item }) => {
        const baseUrl = `${API_CONFIG_URL}`;
        const imageUrl = item.fotoPerfil
            ? `${baseUrl}${item.fotoPerfil.replace(/\\/g, '/')}`
            : null;
    
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    console.log('Prestador selecionado:', item); // Confirma os dados no console
                    navigation.navigate('DetalhesPrestador', { idUsuario: item.id}); // Envia o objeto completo
                }}              
            >

                <Image
                    source={imageUrl ? { uri: imageUrl } : fotoPadrao}
                    style={styles.profileImage}
                    onError={() => console.error('Erro ao carregar imagem')}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{item.nomeComercial || 'Nome não disponível'}</Text>
                    <Text style={styles.services}>
                        Serviços: {item.nomeServico ? item.nomeServico.join(', ') : 'Não especificado'}
                    </Text>
                    <Text style={styles.category}>
                        Categoria: {item.nomeCategoria || 'Sem categoria'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={() => toggleFavorito(item.id)}
                >
                    <Ionicons
                        name={favoritos[item.id] ? 'heart' : 'heart-outline'}
                        size={24}
                        color={favoritos[item.id] ? '#FF6F61' : '#808080'}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleSearch}>
                    <Feather name="search" size={20} color="#FE914E" style={styles.iconLeft} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                {searchTerm.trim() ? (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <AntDesign name="closecircle" size={20} color="#7B68EE" />
                    </TouchableOpacity>
                ) : (
                    <Ionicons name="options-outline" size={20} color="#7B68EE" style={styles.iconRight} />
                )}
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    !loading && results.length === 0 && (
                        <Text style={styles.empty}>Nenhum prestador encontrado.</Text> 
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        elevation: 5,
        marginBottom: 20,
        marginTop: 53,
        marginHorizontal: 10,
    },
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        marginLeft: 10,
    },
    clearButton: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rating: {
        fontSize: 14,
        color: '#FFD700', 
        marginRight: 10,
    },
    distance: {
        fontSize: 14,
        color: '#555',
    },
    services: {
        fontSize: 14,
        color: '#777',
    },
    favoriteIcon: {
        marginLeft: 10,
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999', 
    },
});

export default ServicoPesq;
