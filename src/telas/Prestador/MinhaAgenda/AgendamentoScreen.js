import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AgendamentoScreen({ navigation, route }) {
  const { date, status } = route.params || {};
  const [formData, setFormData] = useState({
    hrAgendamento: "",
    dtAgendamento: date || "",
    valorOrcamento: "",
    endereco: "",
    cidade: "",
    bairro: "",
    numResidencial: "",
    nomeCliente: "",
  });

  useEffect(() => {
    if (date || status) {
      setFormData((prev) => ({
        ...prev,
        tipoDia: status || "",
        dtAgendamento: date || "",
      }));
    }
  }, [date, status]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    const { hrAgendamento, dtAgendamento, valorOrcamento, endereco, cidade, bairro, numResidencial, nomeCliente } = formData;
    if (!hrAgendamento || !dtAgendamento || !valorOrcamento || !endereco || !cidade || !bairro || !numResidencial || !nomeCliente) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const saveAgendamento = async () => {
    if (!validateForm()) return;

    try {
      const storedAgendamentos = await AsyncStorage.getItem("agendamentos");
      const agendamentos = storedAgendamentos ? JSON.parse(storedAgendamentos) : [];
      agendamentos.push(formData);

      await AsyncStorage.setItem("agendamentos", JSON.stringify(agendamentos));
      Alert.alert("Sucesso", "Agendamento salvo com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o agendamento:", error);
      Alert.alert("Erro", "Não foi possível salvar o agendamento.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Hora do Agendamento (HH:mm)"
          value={formData.hrAgendamento}
          onChangeText={(value) => handleInputChange("hrAgendamento", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Data do Agendamento (AAAA-MM-DD)"
          value={formData.dtAgendamento}
          onChangeText={(value) => handleInputChange("dtAgendamento", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor do Orçamento"
          keyboardType="numeric"
          value={formData.valorOrcamento}
          onChangeText={(value) => handleInputChange("valorOrcamento", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={formData.endereco}
          onChangeText={(value) => handleInputChange("endereco", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={formData.cidade}
          onChangeText={(value) => handleInputChange("cidade", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={formData.bairro}
          onChangeText={(value) => handleInputChange("bairro", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número Residencial"
          keyboardType="numeric"
          value={formData.numResidencial}
          onChangeText={(value) => handleInputChange("numResidencial", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={formData.nomeCliente}
          onChangeText={(value) => handleInputChange("nomeCliente", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveAgendamento}>
        <Text style={styles.buttonText}>Salvar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4E40A2",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4E40A2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
