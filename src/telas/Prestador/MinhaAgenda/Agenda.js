import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import Icones from "react-native-vector-icons/Feather";
import { Calendar, LocaleConfig } from "react-native-calendars";
import NotIcone from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { format } from "date-fns";
import API_CONFIG_URL from "../../../Validacoes/ipConfig"; // Ajuste o caminho do seu arquivo de configuração

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ],
  dayNames: [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt";

export default function Agenda({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [markedDays, setMarkedDays] = useState({});
  const [showNotification, setShowNotification] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                setUserData(JSON.parse(data));
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        } catch (error) {
            console.error('Erro ao recuperar os dados do usuário:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do usuário.');
        }
    }

    fetchUserData();
}, []);
  // Função para buscar os agendamentos do usuário
  const fetchAgendamentos = async (idUsuario) => {
    try {
      const response = await axios.get(`${API_CONFIG_URL}/agendas/agendamentos/${idUsuario}`);
      if (response.status === 200) {
        const agendamentos = response.data;
        setAgendamentos(agendamentos);
        
        const marked = {};
        agendamentos.forEach(agendamento => {
          const date = format(new Date(agendamento.data), 'yyyy-MM-dd');
          marked[date] = { marked: true, dotColor: 'blue' }; 
        });
        setMarkedDays(marked);
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os agendamentos.");
    }
  };

  // Função chamada ao selecionar um dia no calendário
  const marcarDia = (day) => {
    setSelectedDay(day); // Salvar o dia selecionado
    setModalVisible(true); // Abrir o modal com opções
  };

  // Função para marcar o dia como "Trabalho"
  const handleMarcarTrabalho = async () => {
    if (selectedDay) {
      const agendamento = {
        usuarioId: userData.id,
        data: selectedDay.dateString,
        tipo: 'Trabalho',
      };

      try {
        const response = await axios.post(`${API_CONFIG_URL}/agendas/agendar`, agendamento);
        if (response.status === 201) {
          Alert.alert("Sucesso", "Agendamento realizado com sucesso.");
          fetchAgendamentos(userData.id); // Recarregar os agendamentos
          setModalVisible(false); // Fechar o modal
        } else {
          Alert.alert("Erro", "Não foi possível agendar.");
        }
      } catch (error) {
        console.error("Erro ao agendar:", error);
        Alert.alert("Erro", "Ocorreu um erro ao agendar.");
      }
    }
  };

  // Função para marcar o dia como "Folga"
  const handleMarcarFolga = async () => {
    if (selectedDay) {
      const agendamento = {
        usuarioId: userData.id,
        data: selectedDay.dateString,
        tipo: 'Folga',
      };

      try {
        const response = await axios.post(`${API_CONFIG_URL}/agendas/agendar`, agendamento);
        if (response.status === 201) {
          Alert.alert("Sucesso", "Folga marcada com sucesso.");
          fetchAgendamentos(userData.id); // Recarregar os agendamentos
          setModalVisible(false); // Fechar o modal
        } else {
          Alert.alert("Erro", "Não foi possível agendar.");
        }
      } catch (error) {
        console.error("Erro ao agendar:", error);
        Alert.alert("Erro", "Ocorreu um erro ao marcar folga.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icones name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notificações")}>
          <Icones style={styles.notificacao} name="bell" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Início")}>
          <Text style={styles.navText}>Meu Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Meus Pedidos")}>
          <Text style={styles.navText}>Meus Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navTextActive}>Agenda</Text>
          <View style={styles.navIndicator} />
        </TouchableOpacity>
      </View>

      {showNotification && (
        <View style={styles.notification}>
          <NotIcone name="information-outline" size={25} color="black" />
          <Text style={styles.notificationText}>
            Abaixo, você encontra a sua agenda com os dias em que terá serviço, além da opção de marcar os seus dias de folga e os dias trabalhados.
          </Text>
          <TouchableOpacity onPress={() => setShowNotification(false)}>
            <Icons name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={marcarDia}
          markedDates={markedDays}
          minDate={new Date().toISOString().split("T")[0]}
          theme={{
            backgroundColor: "#F5F5F5",
            calendarBackground: "#F5F5F5",
            todayTextColor: "#FE914E",
            arrowColor: "#4E40A2",
            monthTextColor: "#4E40A2",
            textMonthFontWeight: "bold",
          }}
        />
      </View>

      {/* Modal para opções */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione uma opção</Text>
            <TouchableOpacity onPress={handleMarcarTrabalho}>
              <Text style={styles.modalOption}>Marcar como Dia de Trabalho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMarcarFolga}>
              <Text style={styles.modalOption}>Marcar como Dia de Folga</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4E40A2",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 60,
  },
  notificacao: {
    marginRight: 10,
    paddingTop: 12,
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#4E40A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -5,
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  navTextActive: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  navIndicator: {
    marginTop: 5,
    width: "100%",
    height: 3,
    backgroundColor: "#FE914E",
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 500,
    marginTop: -20,
  },
  notification: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 20,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 14,
    color: "#282828",
    flex: 1,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 10,
    color: "#4E40A2",
  },
  modalCancel: {
    fontSize: 16,
    color: "#FE914E",
    marginTop: 20,
  },
});
