import React, { useState, useEffect } from 'react';
import { View, Image, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function FotoPerfil() {
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFotoPerfil = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;

                if (userData && userData.id) {
                    const response = await fetch(`http://192.168.0.5:8080/usuarios/${userData.id}/foto-adicionada`);
                    if (response.ok) {
                        const fotoPerfil = await response.text();
                        if (fotoPerfil === "static/images/fotoPadrao.png") {
                            setImageUri(require('../../assets/fotoPadrao.png'));  
                        } else {
                            setImageUri(`http://192.168.0.5:8080/${fotoPerfil.replace(/\\/g, '/')}`); 
                        }
                    } else {
                        console.error("Erro ao buscar a foto de perfil:", response.status);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar a foto de perfil:", error);
            }
        };

        fetchFotoPerfil();
    }, []);

    const handleUploadImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permissão Necessária', 'É necessário conceder permissão para acessar a galeria.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const { uri } = result.assets[0];
                setLoading(true);

                const storedUserData = await AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;

                if (!userData || !userData.id) {
                    Alert.alert("Erro", "Usuário não autenticado.");
                    setLoading(false);
                    return;
                }

                const formData = new FormData();
                formData.append('file', {
                    uri: uri,
                    type: 'image/jpeg',
                    name: uri.split('/').pop(),
                });

                const response = await fetch(`http://192.168.0.5:8080/usuarios/${userData.id}/foto-perfil`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const responseData = await response.text();
                setLoading(false);

                if (response.ok) {
                    Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
                    setImageUri(uri); 
                } else {
                    Alert.alert('Erro', `Erro ao atualizar a foto de perfil: ${responseData}`);
                }
            }
        } catch (error) {
            setLoading(false);
            console.error("Erro ao selecionar ou enviar imagem:", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar atualizar a foto.");
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4E40A2" />
            ) : (
                <View style={styles.imageContainer}>
                    <Image
                        source={imageUri ? { uri: imageUri } : require('../../assets/fotoPadrao.png')}
                        style={styles.image}
                    />
                    <TouchableOpacity style={styles.icon} onPress={handleUploadImage}>
                        <Ionicons name="camera" size={30} color="#4E40A2" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    imageContainer: {
        position: 'relative',
        marginTop: 10,
        bottom: -10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#4E40A2',
    },
    icon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});
