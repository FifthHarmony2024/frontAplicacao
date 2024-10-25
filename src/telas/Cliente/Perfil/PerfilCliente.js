import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";

export default function PerfilCliente({navigation}) {
    const [isEditable, setIsEditable] = useState(false);

    const [nome, setNome] = useState('João');
    const [sobrenome, setSobrenome] = useState('Silva');
    const [email, setEmail] = useState('joao.silva@email.com');
    const [telefone, setTelefone] = useState('91234-5678');
    const [cpf, setCpf] = useState('123.456.789-00');
    const [cep, setCep] = useState('12345-678');
    const [bairro, setBairro] = useState('Centro');
    const [endereco, setEndereco] = useState('Rua Exemplo');
    const [numero, setNumero] = useState('100');
    const [complemento, setComplemento] = useState('Apt 101');
    const [cidade, setCidade] = useState('São Paulo');
    const [estado, setEstado] = useState('Guarulhos');

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    const salvarEdicao = () => {
        setIsEditable(false);
        // Salvar as mudanças
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.profileImage}
                    />
            
                    <Text style={styles.nomeCompleto}>{`${nome} ${sobrenome}`}</Text>
                    <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
                    
                    <TouchableOpacity style={styles.editProfileButton} onPress={toggleEditable}>
                        <Text style={styles.editProfileButtonText}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChangeText={setSobrenome}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        editable={isEditable}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        editable={isEditable}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        value={cpf}
                        editable={false} 
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="CEP"
                        value={cep}
                        onChangeText={setCep}
                        editable={isEditable}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bairro"
                        value={bairro}
                        onChangeText={setBairro}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço"
                        value={endereco}
                        onChangeText={setEndereco}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número Residencial"
                        value={numero}
                        onChangeText={setNumero}
                        editable={isEditable}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Complemento"
                        value={complemento}
                        onChangeText={setComplemento}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                        value={cidade}
                        onChangeText={setCidade}
                        editable={isEditable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Estado"
                        value={estado}
                        onChangeText={setEstado}
                        editable={isEditable}
                    />
                </View>

                {isEditable ? (
                    <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                ) : null}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configurações da conta</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}>Trocar senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EntrarLoginCliente')}>
                        <Text style={[styles.link, styles.red]}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.link, styles.red]}>Excluir conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 20,
    },
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
        paddingTop: 30, // Mover a imagem de perfil para baixo
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },

    nomeCompleto: {
        fontSize: 18,
        color: '#4E40A2',
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
    },
    editProfileButton: {
        marginTop: 10,
        backgroundColor: '#4E40A2',
        padding: 10,
        borderRadius: 5,
    },
    editProfileButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#4E40A2',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        height: 45,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    link: {
        fontSize: 16,
        color: '#4E40A2',
        marginBottom: 10,
    },
    red: {
        color: 'red',
    },
    saveButton: {
        backgroundColor: '#7B68EE',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
