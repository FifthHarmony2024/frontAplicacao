import React, {useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import styles from "../../EstilosCliente/estilosCli";
import { buscarEstados, buscarCidades, buscarTodasCidades,buscarEnderecoPorCep} from '../../../Validacoes/apiIBGE'; 
import API_CONFIG_URL from '../../../Validacoes/ipConfig';

const sexoOpcao = [
    { label: 'Feminino', value: 'FEMININO' },
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Prefiro Não Declarar', value: 'PREFIRO_NAO_DECLARAR'},
];


export default function CadastroClie({ navigation }) {
    const [viewPass, setViewPass] = useState(true);
    const [viewConfirmPass, setViewConfirmPass] = useState(true);
    const [errors, setErrors] = useState({});



    function togglePasswordVisibility() {
        setViewPass(!viewPass);
    }

    function toggleConfirmPasswordVisibility() {
        setViewConfirmPass(!viewConfirmPass);
    }

    
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const validateFields = () => {
        let validationErrors = {};
        
        if (!nome.trim()) validationErrors.nome = 'O campo Nome é obrigatório.';
        if (!sobrenome.trim()) validationErrors.sobrenome = 'O campo Sobrenome é obrigatório.';
        if (!emailLogin.trim() || !/\S+@\S+\.\S+/.test(emailLogin)) validationErrors.emailLogin = 'E-mail inválido.';
        if (!telefone.trim()) validationErrors.telefone = 'O campo Telefone é obrigatório.';
        if (!cpf.trim() || cpf.length !== 11) validationErrors.cpf = 'CPF deve ter 11 dígitos.';
        if (!dataDeNascimento) {
            validationErrors.dataDeNascimento = 'A data de nascimento é obrigatória.';
        }        
        if (!senha.trim()) validationErrors.senha = 'A senha é obrigatória.';
        if (senha !== confSenha) validationErrors.confSenha = 'As senhas não coincidem.';
        if (!cep.trim() || cep.length !== 8) validationErrors.cep = 'CEP inválido.';
        if (!estadoValue) {
            validationErrors.estado = 'O campo Gênero é obrigatório.';
        }        
        if (!cidadeValue) validationErrors.cidade = 'O campo Cidade é obrigatório.';
        if (!endereco.trim()) validationErrors.endereco = 'O campo Endereço é obrigatório.';
        if (!bairro.trim()) validationErrors.bairro = 'O campo Bairro é obrigatório.';
        if (!numResidencial) validationErrors.numResidencial = 'Número residencial é obrigatório.';
        if (!sexoOpcaoValue) {
            validationErrors.sexoOpcao = 'O campo Gênero é obrigatório.';
        }
      
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;

       
    };
    
    
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
    const [numResidencial, setN_Residencial] = useState('');
    const [complementoResi, setComplementoResi] = useState('');
  
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoValue, setEstadoValue] = useState(null);
    const [cidadeValue, setCidadeValue] = useState(null);
    const [estadoFocus, setEstadoFocus] = useState(false);
    const [cidadeFocus, setCidadeFocus] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === 'set' && selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setDataDeNascimento(formattedDate);
        setErrors((prevErrors) => ({ ...prevErrors, dataDeNascimento: undefined }));

    }
    };

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

    const formatarTelefone = (text) => {
        const numeroLimpo = text.replace(/\D/g, '');
    
        let telefoneFormatado = numeroLimpo;
    
        if (numeroLimpo.length > 2) {
          telefoneFormatado = `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2)}`;
        }
        if (numeroLimpo.length > 7) {
          telefoneFormatado = `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 7)}-${numeroLimpo.slice(7, 11)}`;
        }
    
        if (telefoneFormatado.length > 15) {
          telefoneFormatado = telefoneFormatado.slice(0, 15);
        }
    
        setTelefone(telefoneFormatado);
      };
    
      const validarTelefone = () => {
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    
        if (!regexTelefone.test(telefone)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            telefone: 'O telefone deve estar no formato (DD) 99999-9999',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            telefone: null, 
          }));
        }
      };
    
    const handleSubmit = async () => {
        if (!validateFields()) {
            return; 
        }
        let userData = {
            nome,
            sobrenome,
            emailLogin,
            telefone,
            dataDeNascimento,
            senha,
            confSenha,
            cpf,
            cep: cep.replace(/\D/g, ''), 
            bairro,
            endereco,
            numResidencial: numResidencial ? Number(numResidencial) : 0, 
            complementoResi,
            cidade: cidadeValue,
            estado: estadoValue, 
            sexoOpcao: sexoOpcaoValue,
            role: "CLIENTE"
 
        };

    
        console.log('Dados que serão enviados:', JSON.stringify(userData, null, 2));
    
        try {
            const response = await axios.post(`${API_CONFIG_URL}usuarios/cliente`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Cadastro realizado com sucesso:', response.data);
            navigation.navigate('TermoCliente');
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
                                onChangeText={(text) => {
                                    setNome(text); 
                                    setErrors(prevErrors => ({ ...prevErrors, nome: undefined }));
                                }}                            />
                            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

                            <TextInput 
                                style={styles.campos}
                                placeholder="Sobrenome"
                                placeholderTextColor="#282828"
                                value={sobrenome}
                                onChangeText={(text) => {
                                    setSobrenome(text);
                                    setErrors(prevErrors => ({ ...prevErrors, sobrenome: undefined }));
                                }}                            />
                            {errors.sobrenome && <Text style={styles.errorText}>{errors.sobrenome}</Text>}

                            <TextInput 
                                style={styles.campos}
                                placeholder="E-mail"
                                placeholderTextColor="#282828"
                                value={emailLogin}
                                onChangeText={(text) => {
                                    setEmailLogin(text); 
                                    setErrors(prevErrors => ({ ...prevErrors, emailLogin: undefined }));
                                }}                            />
                            {errors.emailLogin && <Text style={styles.errorText}>{errors.emailLogin}</Text>}

                            <TextInput 
                                style={styles.campos}
                                placeholder="(DD) 99999-9999"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={telefone}
                                onChangeText={formatarTelefone}
                                onBlur={validarTelefone} 
                            />

                            {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

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
                    
                                    onChange={(item) => {
                                        setSexoOpcao(item.value);
                                        setSexoOpcaoFocus(false);
                                        setErrors(prevErrors => ({ ...prevErrors, sexoOpcao: undefined })); 
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
                                {errors.sexoOpcao && <Text style={styles.errorTextSe}>{errors.sexoOpcao}</Text>}

                            </View>

                            <TextInput 
                                style={styles.campos}
                                placeholder="CPF"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                maxLength={11} 
                                value={cpf}
                                onChangeText={(text) => {
                                    setCpf(text);
                                    if (text.length === 11) {
                                        const isValidCPF = /^\d{11}$/.test(text);
                                        if (isValidCPF) {
                                            setErrors(prevErrors => ({ ...prevErrors, cpf: undefined })); 
                                        }
                                    }
                                }}
                            />
                            {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
                                                    
                            <TouchableOpacity 
                                style={[styles.campos, styles.dataDeNascimento, !dataDeNascimento && { backgroundColor: '#f0f0f0' }]}  
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={[styles.textoDataDeNascimento, !dataDeNascimento && { color: '#282828' }]}>
                                    {dataDeNascimento || "Data de Nascimento"}
                                </Text>
                            </TouchableOpacity>

                            {errors.dataDeNascimento && (
                               <Text style={styles.errorText}>{errors.dataDeNascimento}</Text>
                            )}
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

                             <TextInput 
                                style={styles.campos}
                                placeholder="CEP"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={cep}
                                onChangeText={(text) => {
                                    setCep(text);
                                    if (text.length === 8) {
                                        buscarEnderecoPorCep(
                                            text, 
                                            setEndereco, 
                                            setBairro, 
                                            setEstadoValue, 
                                            setCidadeValue, 
                                            estados
                                        );
                                    }
                                }}
                            />
                            {errors.cep && <Text style={styles.errorText}>{errors.cep}</Text>}


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
                                    placeholder={!estadoValue ? 'Selecione um estado' : estadoValue}
                                    searchPlaceholder="Pesquisar..."
                                    value={estadoValue}
                                    onFocus={() => setEstadoFocus(true)}
                                    onBlur={() => setEstadoFocus(false)}
                                    onChange={async (item) => {
                                        setEstadoValue(item.value);
                                        setCidadeValue(null); 
                                        setEndereco('');
                                        setBairro('');
                                        const dadosCidades = await buscarCidades(item.value);
                                        setCidades(dadosCidades);
                                        setErrors(prevErrors => ({ ...prevErrors, estado: undefined })); // Remove o erro ao selecionar

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
                                {errors.estado && <Text style={styles.errorTextSe}>{errors.estado}</Text>}

                            </View>


                            <View style={styles.dropdownContainer}>
                            {renderLabelCidade()}
                            <Dropdown
                                style={[styles.dropdown, cidadeFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={cidades}
                                labelField="label"
                                valueField="value"
                                search
                                maxHeight={300}
                                placeholder={!cidadeValue ? 'Selecione uma cidade' : cidadeValue}
                                searchPlaceholder="Pesquisar..."
                                value={cidadeValue}
                                onFocus={() => setCidadeFocus(true)}
                                onBlur={() => setCidadeFocus(false)}
                                onChange={(item) => {
                                    setCidadeValue(item.value);
                                    setEndereco('');
                                    setErrors(prevErrors => ({ ...prevErrors, cidade: undefined })); // Remove o erro ao selecionar
                                    setBairro('');
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
                             {errors.cidade && <Text style={styles.errorTextSe}>{errors.cidade}</Text>}

                        </View>


                            <TextInput 
                                style={styles.campos}
                                placeholder="Bairro"
                                placeholderTextColor="#282828"
                                value={bairro}
                                onChangeText={setBairro}
                            />
                             {errors.bairro && <Text style={styles.errorText}>{errors.bairro}</Text>}

                            <TextInput 
                                style={styles.campos}
                                placeholder="Endereço"
                                placeholderTextColor="#282828"
                                value={endereco}
                                onChangeText={setEndereco}
                            />
                            {errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}

                            <TextInput 
                                style={styles.campos}
                                placeholder="Nº Residencial"
                                placeholderTextColor="#282828"
                                keyboardType="numeric"
                                value={numResidencial.toString()} 
                                onChangeText={text => setN_Residencial(text ? Number(text) : 0)} 
                            />
                            {errors.numResidencial && <Text style={styles.errorText}>{errors.numResidencial}</Text>}

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
                                    onChangeText={(text) => {
                                        setSenha(text);
                                        if (text.trim()) {
                                            setErrors(prevErrors => ({ ...prevErrors, senha: undefined }));
                                        }
                                    }}
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
                                    onChangeText={(text) => {
                                        setConfSenha(text);
                                        if (text === senha) {
                                            setErrors(prevErrors => ({ ...prevErrors, confSenha: undefined })); 
                                        }
                                    }}
                            />
                                <Pressable onPress={toggleConfirmPasswordVisibility} style={styles.iconeOlho}> 
                                    {viewConfirmPass ? 
                                        (<Icones name="eye-off" size={25} color="#282828" />) :
                                        (<Icones name="eye" size={25} color="#282828" />)}
                                </Pressable>
                            </View>
                            {errors.confSenha && <Text style={styles.errorText}>{errors.confSenha}</Text>}

                            <TouchableOpacity style={styles.botao} >
                            <Text style={styles.botaoTexto} onPress={handleSubmit}>Cadastrar</Text>
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
