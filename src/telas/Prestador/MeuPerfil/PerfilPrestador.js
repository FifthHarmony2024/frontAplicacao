import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import Icones from 'react-native-vector-icons/Feather'; 
import Icons from 'react-native-vector-icons/Ionicons';
import Icom from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import FotoPerfil from "../../../Validacoes/FotoPerfil";
import API_CONFIG_URL from '../../../Validacoes/ipConfig';

export default function PerfilPrestador({ navigation }) {
    const [userAddress, setUserAddress] = useState(null); 
    const [userData, setUserData] = useState(null);  
    const [catalogo, setCatalogo] = useState([]);

    const handleUploadImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('É necessário conceder permissão para acessar a galeria.');
                return;
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
    
            if (!result.canceled) {
                const { uri } = result.assets[0]; 
    
                console.log("URI da imagem selecionada:", uri);
    
                const descricao = "Descrição do serviço"; 
    
                const storedUserData = await AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;
                const usuarioId = userData?.id;
    
                if (!usuarioId) {
                    alert("Erro: Usuário não autenticado.");
                    return;
                }
    
                const formData = new FormData();
                formData.append('file', {
                    uri: uri,
                    type: 'image/jpeg',
                    name: uri.split('/').pop(),
                });
                formData.append('descricao', descricao);
                formData.append('usuarioId', usuarioId);
    
                const response = await fetch(`${API_CONFIG_URL}postagens/upload`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });
    
                const data = await response.text();
                if (response.ok) {
                    alert('Imagem enviada com sucesso!');
                    console.log("Resposta do servidor:", data); 

                
                } else {
                    alert('Erro ao enviar imagem: ' + data);
                }
            }
        } catch (error) {
            console.error("Erro ao selecionar ou enviar imagem:", error);
            alert("Erro ao enviar imagem.");
        }
    };
    
            
    const fetchCatalogo = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            const userData = storedUserData ? JSON.parse(storedUserData) : null;
            const usuarioId = userData?.id;
    
            if (!usuarioId) {
                alert("Erro: Usuário não autenticado.");
                return;
            }
    
            const response = await fetch(`${API_CONFIG_URL}postagens/usuario/${usuarioId}`);
            const data = await response.json();
    
            if (response.ok) {
                console.log("Imagens retornadas pelo catálogo:", data); 
                setCatalogo(data);
            } else {
                alert('Erro ao buscar catálogo: ' + (data.message || 'Erro desconhecido.'));
            }
        } catch (error) {
            console.error("Erro ao buscar catálogo:", error);
        }
    };
    
    useEffect(() => {
            fetchCatalogo();
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const parsedData = JSON.parse(data);
    
                    if (!userData) {
                        console.log("Dados armazenados no AsyncStorage:", parsedData);
                    }
    
                    const idUsuario = parsedData.id;
    
                    const response = await fetch(`${API_CONFIG_URL}usuarios/${idUsuario}/perfilPrestador`);
                    const addressData = await response.json();
    
                    if (!userAddress) {
                        console.log("Dados recebidos da API:", addressData);
                    }
    
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
    

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icones name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
                        <Icones
                            style={styles.notificacao}
                            name="bell"
                            size={28}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.navbar}>
                    <TouchableOpacity style={styles.navButton}>
                        <Text style={styles.navTextActive}>Meu Perfil</Text>
                        <View style={styles.navIndicator} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Meus Pedidos')}>
                        <Text style={styles.navText}>Meus Pedidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Minha Agenda')}>
                        <Text style={styles.navText}>Agenda</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfoContainer}>
                    <View style={styles.nameEditContainer}>
                    <Text style={styles.nomeCom}>
                            {userData?.nomeComercial || 'Usuário'}
                    </Text>
                        <Icones
                            style={styles.editar}
                            name="edit"
                            size={18} 
                            color="#fff"
                        />
                    </View>
                </View>
                <View style={styles.profilePictureContainer}>

                    <FotoPerfil />
                </View>

               
                <View style={styles.adContainer}>
                    
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icom
                                style={styles.icon}
                                name="customerservice"
                                size={25} 
                                color="#FE914E"
                            />
                            <Text style={styles.sectionTitle}>Meu Anúncio</Text>
                        </View>

                        <Text style={styles.label}>Categoria:</Text>
                        <Text style={styles.infoTextLarge}>{userData?.nomeCategoria || ''}</Text>

                        <Text style={styles.label}>Descrição do Serviço:</Text>
                            <View style={styles.editDescriptionContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite a descrição do seu serviço"
                                    placeholderTextColor="#aaa"
                                    value={userData?.descricaoServico || ''} 
                                    onChangeText={(text) => {
                                        const updatedData = { ...userData, descricaoServico: text };
                                        setUserData(updatedData); 
                                    }}
                                    multiline
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    alert(`Descrição "${userData?.descricaoServico}" salva com sucesso!`);
                                }}
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText}>Salvar Descrição</Text>
                            </TouchableOpacity>
                    </View>


                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                        <Icons name="briefcase-outline" size={25} color="#FE914E" style={styles.icon} />

                            <Text style={styles.sectionTitle}>Meus Serviços</Text>
                        </View>

                        <Text style={styles.label}>Serviços:</Text>
                            {Array.isArray(userData?.nomeServico) ? (
                                userData.nomeServico.length > 0 ? (
                                    userData.nomeServico.map((servico, index) => (
                                        <View key={index} style={styles.serviceItem}>
                                            <Text style={styles.serviceText}>{servico}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.infoTextLarge}>Nenhum serviço cadastrado</Text>
                                )
                            ) : (
                                <Text style={styles.infoTextLarge}>Nenhum serviço cadastrado</Text>
                            )}


                        {userData?.servicos?.map((servico, index) => (
                            <View key={index} style={styles.serviceItem}>
                                <Text style={styles.serviceText}>{servico}</Text>
                            </View>
                        ))}

                        <Text style={styles.label}>Adicionar Mais Serviços:</Text>
                        <View style={styles.editDescriptionContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Adicione mais serviços"
                                placeholderTextColor="#aaa"
                                value={userData?.novoServico || ''} 
                                onChangeText={(text) => {
                                    const updatedData = { ...userData, novoServico: text };
                                    setUserData(updatedData); 
                                }}
                                multiline
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (userData?.novoServico?.trim()) {
                                    const updatedServicos = [...(userData?.servicos || []), userData.novoServico.trim()];
                                    setUserData({ ...userData, servicos: updatedServicos, novoServico: '' });
                                    alert(`Serviço "${userData.novoServico}" adicionado com sucesso!`);
                                } else {
                                    alert('Por favor, insira um serviço válido.');
                                }
                            }}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Adicionar Serviço</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icons name="trophy-outline" size={25} color="#FFD700" style={styles.icon} />
                            <Text style={styles.sectionTitle}>Conquistas</Text>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.statsLabel}>Quantidade de pessoas atendidas:</Text>
                            <Text style={styles.statsValue}>{userData?.quantidadeAtendimentos || 0}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icons name="image-outline" size={25} color="#4E40A2" style={styles.icon} />
                            <Text style={styles.sectionTitle}>Catálogo</Text>
                        </View>

                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.catalogImagesContainer}
                        >
                            {catalogo.length > 0 ? (
                                catalogo.map((imagem, index) => {
                                    const imageUri = `${API_CONFIG_URL}${imagem.url.replace(/\\/g, '/')}`;
                                    console.log("Imagem carregada no catálogo:", imageUri);

                                    return (
                                        <Image
                                            key={index}
                                            source={{ uri: imageUri }}
                                            style={styles.catalogImage}
                                            onError={(error) => console.log("Erro ao carregar imagem:", error)}
                                        />
                                    );
                                })
                            ) : (
                                <Text style={styles.infoTextLarge}>Nenhuma imagem no catálogo</Text>
                            )}
                        </ScrollView>


                        <TouchableOpacity style={styles.addImageButton} onPress={handleUploadImage}>
                            <Icons name="add-circle-outline" size={55} color="#4E40A2" style={styles.addIcon} />
                        </TouchableOpacity>
                    </View>

                 </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
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
        paddingTop: 12
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#4E40A2',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 360,
        paddingBottom: 30, 
    },
    navButton: {
        alignItems: 'center',
        marginTop: -680
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
    userInfoContainer: {
        alignItems: 'center',
        marginTop: -310, 
        paddingLeft: 12
    },
    nomeCom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', 
    },
   
    adContainer: {
        backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 30,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
        marginTop: -20, 
    },
    sectionContainer: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        marginTop:30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E40A2',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4E40A2',
        marginTop: 10,
    },
    infoTextLarge: {
        fontSize: 17,
        color: '#666',
        marginTop: 5,
    },
    input: {
        fontSize: 15,
        color: '#666',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 5,
        marginTop: 5,
    },
    saveButton: {
        backgroundColor: '#4E40A2',
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
    catalogContainer: {
        marginTop: 15,
    },
    catalogImagesContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 10,
    },
    catalogImage: {
        borderRadius: 10,
        marginHorizontal: 8, 
        resizeMode: 'cover', 
        backgroundColor: '#ccc',
    },
    addButton: {
        backgroundColor: '#4E40A2',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    defaultImage: {
        width: 145, 
        height: 145, 
        borderRadius: 75, 
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D4D1E4', 
        marginTop: -70,
        marginBottom: 10
    },
    addImageButton:{
        alignSelf: 'center',  
        marginTop: 20,       
        position: 'relative',

    },
    nameEditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editar: {
        marginLeft: 10, 
    },
    editDescriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', 
        marginTop: 5,
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        marginRight: 30, 
        flex: 1,
    },
    editIcon: {
        marginLeft: 10,
    },
    statsContainer: {
        marginTop: 16,
        padding: 8,
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
    },
    statsLabel: {
        fontSize: 14,
        color: '#555',
        
    },
    statsValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4E40A2',
        marginTop: 4,
    },
    
    catalogImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
        resizeMode: 'cover', 
        backgroundColor: '#ccc',
    },
    profilePictureContainer: {
        zIndex: 2,
        
    },
});
