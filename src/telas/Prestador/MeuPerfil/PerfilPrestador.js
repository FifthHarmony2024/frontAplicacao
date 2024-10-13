import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import Icones from 'react-native-vector-icons/Feather'; 
import Icons from 'react-native-vector-icons/Ionicons'

export default function PerfilPrestador({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [catalogImages, setCatalogImages] = useState([]);

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorCode) {
                console.log('Erro ao selecionar imagem: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const addCatalogImage = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorCode) {
                console.log('Erro ao selecionar imagem: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setCatalogImages([...catalogImages, response.assets[0].uri]);
            }
        });
    };

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
                        <Text style={styles.headerText}>Nome do Usuário</Text>
                        <Icones
                            style={styles.editar}
                            name="edit"
                            size={18} 
                            color="#fff"
                        />
                    </View>
                    <Text style={styles.profissao}>Profissão</Text>
                </View>

                <View style={styles.adContainer}>
                    <TouchableOpacity onPress={openGallery}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.defaultImage}>
                                <Text style={styles.addImageText}>Adicionar Imagem</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.anuncioContainer}>

                        <Text style={styles.adTitle}>Meu anúncio</Text>
                        <Text style={styles.adDescription}>Descrição do anúncio aqui</Text>
                        
                        <View style={styles.conquistaContainer}>
                            <Icons
                                style={styles.medalha}
                                name="medal-outline"
                                size={25} 
                                color="black"
                            />
                            <Text style={styles.conquista}>Minhas conquistas</Text>
                        </View>

                        <Text style={styles.catalogo}>Catálogo</Text>

                        <View style={styles.catalogContainer}>
                            {catalogImages.length === 0 ? (
                                <Text>Sem imagens no catálogo</Text>
                            ) : (
                                <View style={styles.catalogImagesContainer}>
                                    {catalogImages.map((uri, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri }}
                                            style={styles.catalogImage}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>

                        <TouchableOpacity style={styles.addButton} onPress={addCatalogImage}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.separator} />

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
        paddingTop:12
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
        marginTop:-680
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
        paddingLeft:12
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', 
    },
    profissao: {
        fontSize: 16,
        color: '#FFFFFF', 
        marginBottom: 10,
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
        marginTop: 55, 
    },
    anuncioContainer: {
        marginTop: 20,
        height:500
    },
    adTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight:150
    },
    conquistaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    conquista: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    catalogo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 150,
        marginTop:55
    },
    adDescription: {
        fontSize: 14,
        color: '#666',
    },
    profileImage: {
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        borderWidth: 2,
        borderColor: '#4E40A2',
        marginTop: -90,
    },
    separator: {
        marginTop: 10,
        width: '100%',
        height: 3,
        backgroundColor: '#FE914E',
    },
    defaultImage: {
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D4D1E4', 
        marginTop: -90,
    },
    addImageText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    nameEditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editar: {
        marginLeft: 10, 
    },
    catalogContainer: {
        marginTop: 15,
    },
    catalogImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    catalogImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
    addButton: {
        backgroundColor: '#4E40A2',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft:110
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
