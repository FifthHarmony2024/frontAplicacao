import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import CategoriaServicoDropdown from "./CategoriaServicoDropdown";
import ServicoCategoriaDropdown from "./ServicoCategoriaDropdown";
import { StyleSheet } from 'react-native';

import lgPerfil from '../../../../assets/logoPerfil.png';

const perfil = [
    { label: 'Microempreendedor Individual', value: 'MICROEMPREENDEDOR' },
    { label: 'Autônomo', value: 'AUTONOMO' }
];

export default function InfoPrestador({ navigation }) {
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [nomeComercial, setNomeComercial] = useState('');
    const [selectedServico, setSelectedServico] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    
    const [perfilValue, setPerfilValue] = useState(null);
    const [perfilFocus, setPerfilFocus] = useState(false);

    const handleCategoriaChange = (categoriaId) => {
        setSelectedCategoria(categoriaId);
        setSelectedServico(null); 
    };

    const handleSubmit = async () => {
        let userData = {
            cpf: perfilValue === 'AUTONOMO' ? cpf : null, 
            cnpj: perfilValue === 'MICROEMPREENDEDOR' ? cnpj : null,
            categoriaServico: selectedCategoria, 
            servicos: selectedServico,
            nomeComercial,
            tipoPrestador: perfilValue, 
        };
    
        if (perfilValue === 'AUTONOMO') {
            userData.cpf = cpf.replace(/\D/g, ''); 
            userData.cnpj = null;
        } else if (perfilValue === 'MICROEMPREENDEDOR') {
            userData.cnpj = cnpj.replace(/\D/g, ''); 
            userData.cpf = null; 
        }
    
        console.log("userData:", userData);
    
        console.log('Dados que serão enviados:', JSON.stringify(userData, null, 2));
    
        try {
            const response = await axios.post('http://192.168.0.7:8080/usuarios/prestador', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Cadastro realizado com sucesso:', response.data);
            navigation.navigate('ConfirPrestador');
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message);
            alert('Erro ao cadastrar: ' + (error.response?.data?.message || error.message));
        }
    
    };

    const renderLabelPerfil = () => {
        if (perfilValue || perfilFocus) {
            return (
                <Text style={[styles.label, { top: -10, left: 15, fontSize: 12, color: perfilFocus ? 'blue' : '#4E40A2' }]}>
                    Perfil
                </Text>
            );
        }
        return null;
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                    <View style={styles.fundo}>
                        <View style={styles.headerContainer}>
                            <Icones
                                name="chevron-left"
                                size={40}
                                color='black'
                                onPress={() => navigation.goBack('CadPrestador')}
                                style={styles.seta}
                            />
                            <Text style={styles.titulo}>Informações sobre o seu trabalho</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <CategoriaServicoDropdown 
                                selectedValue={selectedCategoria} 
                                onValueChange={handleCategoriaChange} 
                            />
                             {selectedCategoria && (
                                <ServicoCategoriaDropdown
                                selectedCategoria={selectedCategoria}
                                selectedServico={selectedServico}
                                onServicoChange={setSelectedServico} 
                                />
                            )}

                            <View style={styles.dropdownContainer}>
                                {renderLabelPerfil()}
                                <Dropdown
                                    style={[styles.dropdown, perfilFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={perfil}
                                    search={false}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!perfilFocus ? 'Selecione um perfil' : '...'}
                                    value={perfilValue}
                                    onFocus={() => setPerfilFocus(true)}
                                    onBlur={() => setPerfilFocus(false)}
                                    onChange={item => {
                                        setPerfilValue(item.value);
                                        setPerfilFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                          style={styles.icon}
                                          color={perfilFocus ? '#4E40A2' : '#8A8A8A'}
                                          name="Safety"
                                          size={20}
                                        />
                                    )}
                                />
                            </View>

                            {perfilValue === 'MICROEMPREENDEDOR' ? (
                                <TextInput
                                    style={styles.campos}
                                    placeholder="CNPJ"
                                    placeholderTextColor="#282828"
                                    keyboardType="numeric"
                                    value={cnpj}
                                    onChangeText={setCnpj}
                                />
                            ) : perfilValue === 'AUTONOMO' ? (
                                <TextInput
                                    style={styles.campos}
                                    placeholder="CPF"
                                    placeholderTextColor="#282828"
                                    keyboardType="numeric"
                                    value={cpf}
                                    onChangeText={setCpf}
                                />
                            ) : null}
                        
                            <TextInput
                                style={styles.campos}
                                placeholder="Nome Comercial"
                                placeholderTextColor="#282828"
                                value={nomeComercial}
                                onChangeText={setNomeComercial}
                            />
                        </View>
                        
                        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                            <Text style={styles.botaoTexto}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                      <Image source={lgPerfil} style={styles.lgPerfil} resizeMode="contain" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBE0',
    },
    fundo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between', 
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 80, 
    },
    titulo: {
        fontSize: 22,
        color: '#4E40A2',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
        top:-3
    },
    seta: {
        position: 'absolute',
        top: 75, 
        left: -5,
    },
    inputContainer: {
        width: '90%',
        justifyContent: 'center', 
        flexGrow: 1,
    },
    campos: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        height: 49,
        marginBottom: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#000000',
    },
    botao: {
        backgroundColor: '#FE914E',
        borderRadius: 10,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 180, // Posiciona o botão logo acima da imagem
    },
    botaoTexto: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    dropdownContainer: {
        marginBottom: 10,
    },
    dropdown: {
        height: 49,
        borderColor: '#F5F5F5',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 15,
    },
    lgPerfil: {
        width: 250,
        height: 250,
        position: 'absolute',
        alignSelf: 'center',
        marginTop:705
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        left: 20,
        top: 15,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 15,
    },
    placeholderStyle: {
        fontSize: 15,
        color: '#282828',
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
    },
});
