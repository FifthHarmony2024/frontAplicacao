import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import Icones from 'react-native-vector-icons/Feather'; 
import Icons from 'react-native-vector-icons/Ionicons';
import Icom from 'react-native-vector-icons/AntDesign';

export default function PerfilPrestador({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [catalogImages, setCatalogImages] = useState([]);
    const [serviceDescription, setServiceDescription] = useState(""); 
    const [additionalServiceInfo, setAdditionalServiceInfo] = useState(""); 

    // Dados simulados de cadastro
    const categoryFromCadastro = "Serviço de Limpeza"; 
    const servicesFromCadastro = ["Limpeza de Casas", "Limpeza Comercial"]; 

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

    const saveServiceDescription = () => {
        console.log("Descrição salva:", serviceDescription);
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
                </View>

                <View style={styles.adContainer}>
                    <TouchableOpacity onPress={openGallery}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }}/>
                        ) : (
                            <View style={styles.defaultImage}>
                                <Text style={styles.addImageText}>Adicionar Imagem</Text>
                            </View>
                        )}
                    </TouchableOpacity>

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
                        <Text style={styles.infoText}>{categoryFromCadastro}</Text>

                        <Text style={styles.label}>Descrição do Serviço:</Text>
                        <TextInput 
                            style={styles.input} 
                            value={serviceDescription} 
                            onChangeText={setServiceDescription} 
                            placeholder="Você ainda não adicionou uma descrição"
                            multiline 
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveServiceDescription}>
                            <Text style={styles.saveButtonText}>Salvar Descrição</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icom
                                style={styles.icon}
                                name="folderopen"
                                size={25} 
                                color="#FE914E"
                            />
                            <Text style={styles.sectionTitle}>Serviços que Atendo</Text>
                        </View>

                        {servicesFromCadastro.map((service, index) => (
                            <Text key={index} style={styles.infoText}>{service}</Text>
                        ))}
                        <TextInput 
                            style={styles.input} 
                            value={additionalServiceInfo} 
                            onChangeText={setAdditionalServiceInfo} 
                            placeholder="Adicionar mais detalhes sobre o serviço"
                            multiline 
                        />
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icons
                                style={styles.icon}
                                name="medal-outline"
                                size={25} 
                                color="#FE914E"
                            />
                            <Text style={styles.sectionTitle}>Minhas Conquistas</Text>
                        </View>
                        <Text style={styles.infoText}>Conquistas automáticas baseadas nos pedidos finalizados.</Text>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icom
                                style={styles.icon}
                                name="folderopen"
                                size={25} 
                                color="#FE914E"
                            />
                            <Text style={styles.sectionTitle}>Catálogo</Text>
                        </View>
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
    sectionContainer: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
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
    infoText: {
        fontSize: 15,
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
        marginBottom:10
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
});
