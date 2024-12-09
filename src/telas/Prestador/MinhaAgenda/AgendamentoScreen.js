import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AgendamentosScreen = ({ route, navigation }) => {
  const { idUsuario } = route.params; // Recebe o ID do usuário passado como parâmetro

  // Estados para armazenar os dados do agendamento
  const [dtAgendamento, setDtAgendamento] = useState('');
  const [hrAgendamento, setHrAgendamento] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numResidencial, setNumResidencial] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [error, setError] = useState(null);

  // Função para formatar a data para o padrão ISO (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  // Função para formatar o horário para o padrão HH:MM:SS
  const formatTime = (time) => {
    const t = new Date(time);
    return `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
  };

  // Função para fazer o agendamento
  const handleAgendar = async () => {
    try {
      const agendamento = {
        dtAgendamento: formatDate(dtAgendamento), // Formata a data
        hrAgendamento: formatTime(hrAgendamento), // Formata o horário
        valorOrcamento: parseFloat(orcamento), // Converte o orçamento para número
        endereco,
        cidade,
        bairro,
        numResidencial: parseInt(numResidencial), // Converte número do residencial
        nomeCliente,
      };

      // Verifica se todos os campos necessários estão preenchidos
      if (!dtAgendamento || !hrAgendamento || !orcamento || !endereco || !cidade || !bairro || !numResidencial || !nomeCliente) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      // Requisição para o backend
      const response = await axios.post(
        `http://192.168.0.3/agendas/agendar`, // URL do backend
        agendamento
      );

      if (response.status === 201) {
        alert('Agendamento criado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior após sucesso
      } else {
        setError('Erro ao criar agendamento. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao criar agendamento. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Serviço</Text>
      
      {/* Campo de Data */}
      <Text>Data do Agendamento:</Text>
      <TextInput
        style={styles.input}
        value={dtAgendamento}
        onChangeText={setDtAgendamento}
        placeholder="Selecione a data"
        keyboardType="default"
      />
      
      {/* Campo de Horário */}
      <Text>Horário do Agendamento:</Text>
      <TextInput
        style={styles.input}
        value={hrAgendamento}
        onChangeText={setHrAgendamento}
        placeholder="Ex: 14:00"
        keyboardType="default"
      />

      {/* Campo de Orçamento */}
      <Text>Orçamento:</Text>
      <TextInput
        style={styles.input}
        value={orcamento}
        onChangeText={setOrcamento}
        placeholder="Valor do Orçamento"
        keyboardType="numeric"
      />

      {/* Campo de Endereço */}
      <Text>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
      />

      {/* Campo de Cidade */}
      <Text>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Cidade"
      />

      {/* Campo de Bairro */}
      <Text>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Bairro"
      />

      {/* Número Residencial */}
      <Text>Número Residencial:</Text>
      <TextInput
        style={styles.input}
        value={numResidencial}
        onChangeText={setNumResidencial}
        placeholder="Número"
        keyboardType="numeric"
      />

      {/* Nome do Cliente */}
      <Text>Nome do Cliente:</Text>
      <TextInput
        style={styles.input}
        value={nomeCliente}
        onChangeText={setNomeCliente}
        placeholder="Nome do Cliente"
      />
      
      {/* Exibe o erro caso haja */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {/* Botão de Agendamento */}
      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default AgendamentosScreen;
