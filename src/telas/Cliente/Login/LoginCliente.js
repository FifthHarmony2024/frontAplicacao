import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icones from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/EvilIcons";
import { Buffer } from 'buffer';

export default function LoginCliente({ navigation }) {
    const [viewPass, setViewPass] = useState(true);
    const [emailLogin, setEmailLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');

    function togglePasswordVisibility() {
        setViewPass(!viewPass);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError("Por favor, insira um e-mail válido.");
        } else {
            setEmailError("");
        }
    }

    async function handleLogin() {
        setLoginError(''); 

        if (!emailLogin && !senha) {
            Alert.alert("Erro", "Insira e-mail e senha.");
            return;
        } else if (!emailLogin) {
            Alert.alert("Erro", "Digite o e-mail.");
            return;
        } else if (!senha) {
            Alert.alert("Erro", "Digite a senha.");
            return;
        }

            try {
                const response = await fetch('http://192.168.0.7:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emailLogin, senha }),
                });
        
                if (!response.ok) {
                    Alert.alert("Erro", "Usuário ou senha inválidos");
                    return;
                }
        
                const data = await response.json();
                const token = data.token;
                if (data && data.token) {
                    await AsyncStorage.setItem('userToken', data.token);
                
                    const partes = data.token.split('.');
                
                    if (partes.length !== 3) {
                        Alert.alert("Erro", "Token inválido.");
                        return;
                    }
                
                    const payload = JSON.parse(Buffer.from(partes[1], 'base64').toString());
                    console.log("Payload do token:", payload);
                
                    await AsyncStorage.setItem('userData', JSON.stringify(payload));
                
                    navigation.navigate('TelaServ');
                }
                
            } catch (error) {
                console.error("Erro ao fazer login:", error);
                Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
            }
        
        
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                    <View style={styles.circleBackground} />
                    <View style={styles.fundoLaran}>
                        <Icones
                            style={styles.seta}
                            name="chevron-left"
                            size={40}
                            color='#ffffff'
                            onPress={() => navigation.goBack('Perfil')}
                        />
                        <Text style={styles.titulo}>Login</Text>

                        <View style={styles.inputContainer}>
                            <View style={styles.visualizar}>
                                <Icone name="email-outline" size={20} color="#8A8A8A" style={styles.iconeEmail} />
                                <TextInput
                                    style={styles.campos}
                                    placeholder="E-mail"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={emailLogin}
                                    onChangeText={(text) => {
                                        setEmailLogin(text);
                                        validateEmail(text);
                                    }}
                                />
                            </View>
                            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                            <View style={styles.visualizar}>
                                <Icon name="lock" size={35} color="#8A8A8A" style={styles.iconeSenha} />
                                <TextInput
                                    style={styles.camposSenha}
                                    placeholder="Senha"
                                    placeholderTextColor="#8A8A8A"
                                    secureTextEntry={viewPass}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                                <Pressable onPress={togglePasswordVisibility} style={styles.iconeOlho}>
                                    {viewPass ?
                                        (<Icones name="eye-off" size={25} color="#8A8A8A" />) :
                                        (<Icones name="eye" size={25} color="#8A8A8A" />)}
                                </Pressable>
                            </View>
                        </View>

                        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

                        <Text style={styles.linkTexto}>Esqueci minha senha</Text>

                        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                            <Text style={styles.botaoTexto}>Entrar</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.cadastroTexto}>
                        Não possui conta? <Text style={styles.cadastroLink} onPress={() => navigation.navigate('CadCliente')}>Cadastre-se</Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    fundoLaran: {
        width: '100%',
        height: 700,
        backgroundColor: '#FF8E4E', 
        borderBottomLeftRadius: 200, 
        borderBottomRightRadius: 200, 
        alignItems: 'center',
        paddingVertical: 50,
        position: 'absolute',
        top: 0,
    },
    titulo: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 50,
        marginTop: -65,
    },
    seta:{
        width: 350,
        fontSize: 30,
        marginBottom: 30,
        marginTop: 40,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        marginTop: 80,
    },
    visualizar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15, 
    },
    campos: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 10, 
    },
    camposSenha: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 10,
    },
    iconeEmail: {
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        textAlign: 'center'
    },
    iconeSenha: {
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,    
        marginLeft: -2,
        textAlign: 'center'
    },
    iconeOlho: {
        paddingHorizontal: 10,
    },
    botaoTexto: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    linkTexto: {
        marginTop: -16,
        marginRight: 150,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
    cadastroTexto: {
        color: '#000000',
        marginTop: 800,
    },
    cadastroLink: {
        color: '#FF0000',
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#4E40A2',
        borderRadius: 50,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    errorText: {
        color: '#3A3074',
        fontSize: 14,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 15,
    },
});
