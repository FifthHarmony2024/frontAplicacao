import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AgendamentoScreen({ navigation, route }) {
  const cliente = route.params?.cliente || {
    nome: "Nome do Cliente",
    telefone: "(11) xxx-xxxx",
    email: "*****@****.com",
    rating: 4.5,
  };

  const [data, setData] = useState(null);
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [horario, setHorario] = useState(null);
  const [mostrarTimePicker, setMostrarTimePicker] = useState(false);
  const [orcamento, setOrcamento] = useState("R$ 0,00");

  const onChangeData = (event, selectedDate) => {
    setMostrarDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const onChangeHorario = (event, selectedTime) => {
    setMostrarTimePicker(false);
    if (selectedTime) {
      const horas = selectedTime.getHours().toString().padStart(2, '0');
      const minutos = selectedTime.getMinutes().toString().padStart(2, '0');
      setHorario(`${horas}:${minutos}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack('ChatDentro')} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Agendamento</Text>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity onPress={() => setMostrarDatePicker(true)}>
        <TextInput 
          style={styles.input} 
          placeholder="dd/mm/aaaa" 
          value={data ? data.toLocaleDateString('pt-PT') : ""} 
          editable={false} 
        />
      </TouchableOpacity>
      {mostrarDatePicker && (
        <DateTimePicker
          value={data || new Date()} 
          mode="date"
          display="default"
          onChange={onChangeData}
        />
      )}

      <Text style={styles.label}>Horário</Text>
      <TouchableOpacity onPress={() => setMostrarTimePicker(true)}>
        <TextInput 
          style={styles.input} 
          placeholder="hh:mm" 
          value={horario || ""} 
          editable={false} 
        />
      </TouchableOpacity>
      {mostrarTimePicker && (
        <DateTimePicker
          value={new Date()} 
          mode="time"
          display="default"
          onChange={onChangeHorario}
        />
      )}

      <Text style={styles.label}>Local</Text>
      <TextInput style={styles.input} placeholder="Endereço" />

      <Text style={styles.label}>Orçamento</Text>
      <TextInput 
        style={styles.input} 
        placeholder="R$ 0,00" 
        value={orcamento}
        onChangeText={setOrcamento}
        keyboardType="numeric" 
      />

      <View style={styles.clientInfo}>
        <Text style={styles.clientTitle}>Cliente</Text>
        <View style={styles.clientRow}>
          <FontAwesome name="user-circle" size={24} color="grey" />
          <Text style={styles.clientText}>{cliente.nome}</Text>
          <View style={styles.rating}>
            {[...Array(Math.floor(cliente.rating))].map((_, i) => (
              <FontAwesome key={i} name="star" size={14} color="orange" />
            ))}
            {cliente.rating % 1 !== 0 && (
              <FontAwesome name="star-half" size={14} color="orange" />
            )}
          </View>
        </View>

        <View style={styles.clientRow}>
          <Ionicons name="call-outline" size={24} color="grey" />
          <Text style={styles.clientText}>{cliente.telefone}</Text>
        </View>

        <View style={styles.clientRow}>
          <Ionicons name="mail-outline" size={24} color="grey" />
          <Text style={styles.clientText}>{cliente.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar para o Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    marginTop: 55,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#4a3dab',
    borderRadius: 50,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a3dab',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#4a3dab',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#ffffff',
  },
  clientInfo: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  clientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a3dab',
    marginBottom: 10,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  clientText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 10,
  },
  rating: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FF8E4E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
