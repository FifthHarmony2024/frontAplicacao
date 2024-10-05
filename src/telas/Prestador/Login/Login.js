import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/EvilIcons";

export default function Login({ navigation }) {

    const [viewPass, setViewPass] = useState(true);
    
    function togglePasswordVisibility(){
        setViewPass(!viewPass);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"} >

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                 <View style={styles.fundoRoxo}>
                    <View style={styles.circleBackground} />
                    <Icones 
                            style={styles.seta2} 
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
                                    placeholderTextColor="#8A8A8A" />
                            </View>

                            <View style={styles.visualizar}>
                                <Icon name="lock" size={35} color="#8A8A8A" style={styles.iconeSenha} />
                                <TextInput 
                                    style={styles.camposSenha}
                                    placeholder="Senha"
                                    placeholderTextColor="#8A8A8A"
                                    secureTextEntry={viewPass}
                                />
                                <Pressable onPress={togglePasswordVisibility} style={styles.iconeOlho}> 
                                    {viewPass ? 
                                        (<Icones name="eye-off" size={25} color="#8A8A8A" />) :
                                        (<Icones name="eye" size={25} color="#8A8A8A" />)}
                                </Pressable>
                            </View>
                        </View>

                        <Text style={styles.linkTexto}>Esqueci minha senha</Text>

                        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Drawer')}>
                            <Text style={styles.botaoTexto}>Entrar</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                    <Text style={styles.cadastroTexto}>
                        Não possui conta? <Text style={styles.cadastroLink} onPress={() => navigation.navigate('CadPrestador')}>Cadastre-se</Text>
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
    fundoRoxo: {
        width: '100%',
        height: 700,
        backgroundColor: '#4E40A2', 
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
    seta2:{
        width: 350,
        fontSize: 30,
        color: '#FFFFFF',
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
        marginLeft:-2,
        textAlign: 'center'
    },
    iconeOlho: {
        paddingHorizontal: 10,
    },
    botao: {
        backgroundColor: '#FE914E',
        borderRadius: 50,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    botaoTexto: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    linkTexto: {
        marginTop: -15,
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
});
