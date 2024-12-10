import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DetalhesAgendamento({ route }) {
  const { agendamento } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalhes do Agendamento</Text>
        <Text style={styles.label}>Cliente: {agendamento.nomeCliente}</Text>
        <Text style={styles.label}>Hora: {agendamento.hrAgendamento}</Text>
        <Text style={styles.label}>Data: {agendamento.dtAgendamento}</Text>
        <Text style={styles.label}>Endereço: {agendamento.endereco}</Text>
        <Text style={styles.label}>Cidade: {agendamento.cidade}</Text>
        <Text style={styles.label}>Bairro: {agendamento.bairro}</Text>
        <Text style={styles.label}>Número: {agendamento.numResidencial}</Text>
        <Text style={styles.label}>Valor Orçamento: R$ {agendamento.valorOrcamento}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E40A2',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});
