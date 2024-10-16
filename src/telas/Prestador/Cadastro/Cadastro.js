import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { buscarEstados, buscarCidades, buscarTodasCidades} from '../../../Validacoes/apiIBGE'; 
import styles from "../../EstiloPrestador/estilos";
import CategoriaServicoDropdown from "./CategoriaServicoDropdown";



const perfil = [
    { label: 'Microempreendedor Individual', value: 'MICROEMPREENDEDOR' },
    { label: 'Autônomo', value: 'AUTONOMO' }
];

const sexoOpcao = [
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'MASCULINO', value: 'MASCULINO' },
    { label: 'PREFIRO NÃO DECLARAR', value: 'PREFIRO NÃO DECLARAR' },
];

export default function Cadastro({ navigation }) {
    const [viewPass, setViewPass] = useState(true);
    const [viewConfirmPass, setViewConfirmPass] = useState(true);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [documento, setDocumento] = useState('');
    const [nomeComercial, setNomeComercial] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numResidencial, setNumResidencial] = useState('');
    const [complementoResi, setComplementoResi] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoValue, setEstadoValue] = useState(null);
    const [cidadeValue, setCidadeValue] = useState(null);
    const [estadoFocus, setEstadoFocus] = useState(false);
    const [cidadeFocus, setCidadeFocus] = useState(false);

    const [perfilValue, setPerfilValue] = useState(null);
    const [perfilFocus, setPerfilFocus] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const [sexoOpcaoValue, setSexoOpcao] = useState('');
    const [sexoOpcaoFocus, setSexoOpcaoFocus] = useState(false);

    const renderLabelSexoOpcao = () => {
        if (sexoOpcaoValue || sexoOpcaoFocus) {
            return (
                <Text style={[styles.label, { top: -10, left: 15, fontSize: 12, color: sexoOpcaoFocus ? 'blue' : '#4E40A2' }]}>
                    Gênero
                </Text>
            );
        }
        return null;
    };
  

    const handleCategoriaChange = (categoriaId) => {
      setSelectedCategoria(categoriaId);
    };
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === 'set' && selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setDataDeNascimento(formattedDate);
         }
    };
    
    const togglePasswordVisibility = () => {
        setViewPass(!viewPass);
    };

    const toggleConfirmPasswordVisibility = () => {
        setViewConfirmPass(!viewConfirmPass);
    };
    const handleSubmit = async () => {
        let userData = {
            nome,
            sobrenome,
            emailLogin,
            telefone,
            dataDeNascimento,
            senha,
            cep: cep.replace(/\D/g, ''), 
            bairro,
            endereco,
            numResidencial:numResidencial ? Number(numResidencial) : 0,
            complementoResi,
            categoriaServico: selectedCategoria, 
            servicos: servicoValue,
            nomeComercial,
            tipoPrestador: perfilValue, 
            cidade: cidadeValue,
            estado: estadoValue, 
            sexoOpcao: sexoOpcaoValue,
            confSenha
        };
    
        if (perfilValue === 'AUTONOMO') {
            userData.cpf = documento.replace(/\D/g, ''); 
        } else if (perfilValue === 'MICROEMPREENDEDOR') {
            userData.cnpj = documento.replace(/\D/g, ''); 
        }
    
        console.log('Dados que serão enviados:', JSON.stringify(userData, null, 2));
    
        try {
            const response = await axios.post('http://192.168.0.6:8080/usuarios/prestador', userData, {
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>
                    <View style={styles.circleBackground} />
                    <View style={styles.fundoRoxo}>
                        <Icones
                            style={styles.seta}
                            name="chevron-left"
                            size={40}
                            color='#ffffff'
                            onPress={() => navigation.goBack('EntrarLogin')}
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

                            <TouchableOpacity
                                style={[styles.campos, styles.dataDeNascimento]}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={[styles.textoDataDeNascimento, !dataDeNascimento && { color: '#282828' }]}>
                                    {dataDeNascimento || "Data de Nascimento"}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                    maximumDate={new Date(2006, 11, 31)}
                                    minimumDate={new Date(1940, 0, 1)}
                                />
                            )}

                            <View style={styles.dropdownContainer}>
                                {renderLabelSexoOpcao()}
                                <Dropdown
                                    style={[styles.dropdown, sexoOpcaoFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={sexoOpcao}
                                    search={false}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!sexoOpcaoFocus ? 'Selecione um gênero' : '...'}
                                    value={sexoOpcaoValue}
                                    onFocus={() => setSexoOpcaoFocus(true)}
                                    onBlur={() => setSexoOpcaoFocus(false)}
                                    onChange={item => {
                                        setSexoOpcao(item.value);
                                        setSexoOpcaoFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={sexoOpcaoFocus ? '#4E40A2' : '#8A8A8A'}
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
                                />
                            </View>
                            <CategoriaServicoDropdown 
                                selectedValue={selectedCategoria} 
                                onValueChange={handleCategoriaChange} 
                            />

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
                                    value={documento}
                                    onChangeText={setDocumento}
                                />
                            ) : perfilValue === 'AUTONOMO' ? (
                                <TextInput
                                    style={styles.campos}
                                    placeholder="CPF"
                                    placeholderTextColor="#282828"
                                    keyboardType="numeric"
                                    value={documento}
                                    onChangeText={setDocumento}
                                />
                            ) : null}
                        
                            <TextInput
                                style={styles.campos}
                                placeholder="Nome Comercial"
                                placeholderTextColor="#282828"
                                value={nomeComercial}
                                onChangeText={setNomeComercial}
                            />

  
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
                                value={numResidencial}
                                onChangeText={setNumResidencial}
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
                                    {viewPass ? (
                                        <Icones name="eye-off" size={25} color="#282828" />
                                    ) : (
                                        <Icones name="eye" size={25} color="#282828" />
                                    )}
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
                                    {viewConfirmPass ? (
                                        <Icones name="eye-off" size={25} color="#282828" />
                                    ) : (
                                        <Icones name="eye" size={25} color="#282828" />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                        
                        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                            <Text style={styles.botaoTexto}>Cadastrar</Text>
                        </TouchableOpacity>

                        <Text style={styles.cadastroTexto}>
                            Já possui conta? <Text style={styles.cadastroLink} onPress={() => navigation.navigate('EntrarLoginPrestador')}>Entrar</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}