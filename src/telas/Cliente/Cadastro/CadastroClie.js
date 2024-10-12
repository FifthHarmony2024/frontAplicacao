import React, {useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import styles from "../../EstilosCliente/estilosCli";
import { buscarEstados, buscarCidades, buscarTodasCidades} from '../../../Validacoes/apiIBGE'; 


const generoOpcao = [
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Prefiro não declarar', value: 'Prefiro não declarar' },
];

export default function CadastroClie({ navigation }) {
    const [viewPass, setViewPass] = useState(true);
    const [viewConfirmPass, setViewConfirmPass] = useState(true);
    

    function togglePasswordVisibility() {
        setViewPass(!viewPass);
    }

    function toggleConfirmPasswordVisibility() {
        setViewConfirmPass(!viewConfirmPass);
    }

    
    const [dataNascimento, setDataDeNascimento] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);


    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nResidencial, setN_Residencial] = useState('');
    const [complementoResi, setComplementoResi] = useState('');
    const [genero,setGenero] = useState('');
    const [generoFocus, setGeneroFocus] = useState(false);

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoValue, setEstadoValue] = useState(null);
    const [cidadeValue, setCidadeValue] = useState(null);
    const [estadoFocus, setEstadoFocus] = useState(false);
    const [cidadeFocus, setCidadeFocus] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);  
        if (event.type === 'set' && selectedDate) {  
            setDataDeNascimento(selectedDate.toLocaleDateString('pt-BR'));
        }
    };

    const renderLabelGenero = () => {
        if (genero || generoFocus) {
            return (
                <Text style={[styles.label, { top: -10, left: 15, fontSize: 12, color: generoFocus ? 'blue' : '#4E40A2' }]}>
                    Gênero
                </Text>
            );
        }
        return null;
    };

    const handleSubmit = async () => {
        console.log('nResidencial:', nResidencial);  
        let userData = {
            nome,
            sobrenome,
            emailLogin,
            telefone,
            dataNascimento,
            senha,
            confSenha,
            cep: cep.replace(/\D/g, ''), 
            bairro,
            endereco,
            nResidencial: nResidencial ? Number(nResidencial) : 0, 
            complementoResi,
            cidade: cidadeValue,
            estado: estadoValue, 
            genero
 
        };

    
        console.log('Dados que serão enviados:', JSON.stringify(userData, null, 2));
    
        try {
            const response = await axios.post('http://192.168.0.7:8080/usuarios/cliente', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const selectResponse = await axios.get('http://192.168.0.7:8080/usuarios'); 
            console.log('Dados cadastrados:', selectResponse.data);

            console.log('Cadastro realizado com sucesso:', response.data);
            navigation.navigate('ConfiClie');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Erro de Conflito: ' + error.response.data); 
            } else if (error.response && error.response.status === 400) {
                alert('Erro de Validação: ' + error.response.data); 
            } else {
                console.error('Erro ao cadastrar:', error.message);
                alert('Erro ao cadastrar: ' + error.message);
            }
        }
    };
    const renderLabelEstado = () => {
        if (estadoValue || estadoFocus) {
            return (
                <Text style={[styles.label, { top: -10, left: 15, fontSize: 12, color: estadoFocus ? 'blue' : '#4E40A2' }]}>
                    Estado
                </Text>
            );
        }
        return null;
    };

    const renderLabelCidade = () => {
        if (cidadeValue || cidadeFocus) {
            return (
                <Text style={[styles.label, { top: -10, left: 15, fontSize: 12, color: cidadeFocus ? 'blue' : '#4E40A2' }]}>
                    Cidade
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        const carregarEstados = async () => {
        try {
            const dadosEstados = await buscarEstados(); 
            setEstados(dadosEstados); 
        } catch (error) {
            console.error('Erro ao carregar estados:', error);
        }
        };
        carregarEstados();
    }, []);

    useEffect(() => {
        const carregarCidades = async () => {
        if (estadoValue) {
            try {
            const dadosCidades = await buscarCidades(estadoValue);
            setCidades(dadosCidades); 
            } catch (error) {
            console.error('Erro ao carregar cidades do estado:', error);
            }
        } else {
            try {
            const dadosTodasCidades = await buscarTodasCidades();
            setCidades(dadosTodasCidades);
            } catch (error) {
            console.error('Erro ao carregar todas as cidades:', error);
            }
        }
        };
        carregarCidades();
    }, [estadoValue]); 

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                    <View style={styles.circleBackground} />

                    <View style={styles.fundoLaran}>
                        <Icones 
                            style={styles.seta} 
                            name="chevron-left" 
                            size={40} 
                            color='#ffffff'  
                            onPress={() => navigation.goBack('EntrarLoginCliente')} 
                        />
                        <Text style={styles.titulo}>Cadastre-se</Text>

                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.campos}
                                placeholder="Nome"
                                placeholderTextColor="#282828"
                                value={nome}
                                onChangeText={setNome}
                            />
                            <TextInput 
                                style={styles.campos}
                                placeholder="Sobrenome"
                                placeholderTextColor="#282828"
                                value={sobrenome}
                                onChangeText={setSobrenome}
                            />
                            <TextInput 
                                style={styles.campos}
                                placeholder="E-mail"
                                placeholderTextColor="#282828"
                                value={emailLogin}
                                onChangeText={setEmailLogin}
                            />
                             <TextInput 
                                style={styles.campos}
                                placeholder="Telefone"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={telefone}
                                onChangeText={setTelefone}
                            />
                            <View style={styles.dropdownContainer}>
                                    {renderLabelGenero()}
                                    <Dropdown
                                        style={[styles.dropdown, generoFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={generoOpcao}
                                        search={false}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!generoFocus ? 'Selecione um gênero' : '...'}
                                        value={genero}
                                        onFocus={() => setGeneroFocus(true)}
                                        onBlur={() => setGeneroFocus(false)}
                                        onChange={item => {
                                            setGenero(item.value);
                                            setGeneroFocus(false);
                                        }}
                                        renderLeftIcon={() => (
                                            <AntDesign
                                                style={styles.icon}
                                                color={generoFocus ? '#4E40A2' : '#8A8A8A'}
                                                name="Safety"
                                                size={20}
                                            />
                                        )}
                                    />
                            </View>
                            <TextInput 
                                style={styles.campos}
                                placeholder="CPF"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={cpf}
                                onChangeText={setCpf}
                            />
                           
                            <TouchableOpacity 
                                style={[styles.campos, styles.dataNascimento]}  
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={[styles.textoDataNascimento, !dataNascimento && { color: '#282828' }]}>
                                    {dataNascimento || "Data de Nascimento"}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date()} 
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                    maximumDate={new Date(2006,11,31)} 
                                    minimumDate={new Date(1940, 0, 1)}
                                />
                            )}
                             <TextInput 
                                style={styles.campos}
                                placeholder="CEP"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={cep}
                                onChangeText={setCep}
                            />
                            <View style={styles.dropdownContainer}>
                                {renderLabelEstado()}
                                <Dropdown
                                    style={[styles.dropdown, estadoFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={estados}
                                    labelField="label"
                                    valueField="value"
                                    search
                                    maxHeight={300}
                                    placeholder={!estadoFocus ? 'Selecione um estado' : '...'}
                                    searchPlaceholder="Pesquisar..."
                                    value={estadoValue}
                                    onFocus={() => setEstadoFocus(true)}
                                    onBlur={() => setEstadoFocus(false)}
                                    onChange={item => {
                                        setEstadoValue(item.value);
                                        setCidadeValue(null); 
                                        setCidades([]); 
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={estadoFocus ? '#4E40A2' : '#8A8A8A'}
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
                                />
                            </View>
                            <View style={styles.dropdownContainer}>
                                {renderLabelCidade()}
                                <Dropdown
                                    style={[styles.dropdown, cidadeFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    search
                                    maxHeight={300}
                                    placeholder={!cidadeFocus ? 'Selecione uma cidade' : '...'}
                                    searchPlaceholder="Pesquisar..."
                                    data={cidades}
                                    labelField="label"
                                    valueField="value"
                                    value={cidadeValue}
                                    onFocus={() => setCidadeFocus(true)}
                                    onBlur={() => setCidadeFocus(false)}
                                    onChange={item => {
                                        setCidadeValue(item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={cidadeFocus ? '#4E40A2' : '#8A8A8A'}
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
                                />
                            </View>
                            <TextInput 
                                style={styles.campos}
                                placeholder="Bairro"
                                placeholderTextColor="#282828"
                                value={bairro}
                                onChangeText={setBairro}
                            />
                            <TextInput 
                                style={styles.campos}
                                placeholder="Endereço"
                                placeholderTextColor="#282828"
                                value={endereco}
                                onChangeText={setEndereco}
                            />
                            <TextInput 
                                style={styles.campos}
                                placeholder="Nº Residencial"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={nResidencial.toString()} 
                                onChangeText={text => setN_Residencial(text ? Number(text) : 0)} 
                            />

                            <TextInput 
                                style={styles.campos}
                                placeholder="Complemento"
                                placeholderTextColor="#282828"
                                value={complementoResi}
                                onChangeText={setComplementoResi}
                            />

                            <View style={styles.inputSenha}>
                                <TextInput 
                                    style={styles.camposSenha}
                                    placeholder="Senha"
                                    placeholderTextColor="#282828"
                                    secureTextEntry={viewPass}
                                    value={senha}
                                onChangeText={setSenha}
                                />
                                <Pressable onPress={togglePasswordVisibility} style={styles.iconeOlho}> 
                                    {viewPass ? 
                                        (<Icones name="eye-off" size={25} color="#282828" />) :
                                        (<Icones name="eye" size={25} color="#282828" />)}
                                </Pressable>
                            </View>
                            <View style={styles.inputSenha}>
                                <TextInput 
                                    style={styles.camposSenha}
                                    placeholder="Confirmar Senha"
                                    placeholderTextColor="#282828"
                                    secureTextEntry={viewConfirmPass}
                                    value={confSenha}
                                    onChangeText={setConfSenha}
                                />
                                <Pressable onPress={toggleConfirmPasswordVisibility} style={styles.iconeOlho}> 
                                    {viewConfirmPass ? 
                                        (<Icones name="eye-off" size={25} color="#282828" />) :
                                        (<Icones name="eye" size={25} color="#282828" />)}
                                </Pressable>
                            </View>
                            <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                            <Text style={styles.botaoTexto} onPress={() => navigation.navigate('ConfiClie')}>Cadastrar</Text>
                        </TouchableOpacity>

                        <Text style={styles.cadastroTexto}>
                            Já possui conta? <Text style={styles.cadastroLink} onPress={() => navigation.navigate('Telaerv')}>Entrar</Text>
                        </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>          

      
    );
}
