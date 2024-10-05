import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import Icones from 'react-native-vector-icons/Feather';

import lgConfi from '../../../../assets/logoConf.png'

export default function Confirmacao({navigation}) {
    const [codigo, setCodigo] = useState(["", "", "", ""]);
    const inputsRef = useRef([]);

    const handleChangeText = (text, index) => {
        const novoCodigo = [...codigo];
        novoCodigo[index] = text;
        setCodigo(novoCodigo);

        if (text.length === 1 && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "position" : "none"} 
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} 
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                    <View style={styles.fundo}>
                        <Icones 
                            style={styles.seta} 
                            name="chevron-left" 
                            size={40} 
                            color='#ffffff'  
                            onPress={() => navigation.goBack('CadPrestador')} 
                        />
                        <Text style={styles.titulo}>Confirmação</Text>

                        <View style={styles.containerProgresso}>
                            <View style={styles.circulo}>
                                <AntDesign name="check" size={20} color="#FFF" />
                            </View>
                            <View style={styles.linha} />
                            <View style={styles.circuloAtivo}>
                                <View style={styles.circuloInterno} />
                            </View>
                            <View style={styles.linhaInativa} />
                            <View style={styles.circuloInativo} />
                        </View>

                        <Text style={styles.subtitulo}>
                            Enviamos um código para o e-mail e2......ho@gm....om
                        </Text>

                        <View style={styles.containerCodigo}>
                            {codigo.map((valor, index) => (
                                <TextInput
                                    key={index}
                                    ref={(input) => { inputsRef.current[index] = input; }}
                                    style={styles.inputCodigo}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={valor}
                                    onChangeText={(text) => handleChangeText(text, index)}
                                />
                            ))}
                        </View>

                        <TouchableOpacity>
                            <Text style={styles.link}>Reenviar código</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.link} onPress={() => navigation.navigate('ConfirPresTel')}>Enviar de outra forma</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TermoPrestador')}>
                            <Text style={styles.botaoTexto}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={lgConfi} style={styles.lgConfi} resizeMode="contain" />
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
    fundo: {
        width: '100%',
        height: 700,
        backgroundColor: '#4E40A2',
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
        alignItems: 'center',
        paddingVertical: 50,
        position: 'absolute',
        top: 0,
        paddingTop: 73, 
    },
    titulo: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 20,
        marginTop: 0,  
    },
    containerProgresso: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 50,
            marginTop: 20,
            justifyContent: 'space-between', 
            width: '80%', 
        },
        circulo: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#FE914E',
            justifyContent: 'center',
            alignItems: 'center',
        },
        circuloAtivo: {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#FE914E',
            justifyContent: 'center',
            alignItems: 'center',
        },
        circuloInterno: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: '#FE914E',
        },
        circuloInativo: {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
        },
        linha: {
            width: 100, 
            height: 2,
            backgroundColor: '#FE914E',
            marginHorizontal: 10, 
        },
        linhaInativa: {
            width: 100, 
            height: 2,
            backgroundColor: '#FFFFFF',
            marginHorizontal: 10, 
    },
        
    titulo: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 20,
        marginTop: 10,
    },
    subtitulo: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
    },
    containerCodigo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    inputCodigo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        width: 60,
        height: 60,
        textAlign: 'center',
        fontSize: 24,
        color: '#000000',
    },
    link: {
        color: '#FFFFFF',
        marginTop: 10,
        textDecorationLine: 'underline',
        alignSelf: 'center',
    },
    seta: {
        position: 'absolute',
        top: 84, 
        left: 20,
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
        fontWeight: 'bold'
    },
    logoContainer: {
        position: 'absolute', 
        bottom: -87, 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
    lgConfi: {
        width: 250,
        height:250,
    }
});
