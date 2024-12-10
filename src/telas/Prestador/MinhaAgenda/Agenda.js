import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icones from "react-native-vector-icons/Feather";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ],
  dayNames: [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt";

export default function Agenda({ navigation }) {
  const [markedDays, setMarkedDays] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedDays = await AsyncStorage.getItem("markedDays");
        const storedAgendamentos = await AsyncStorage.getItem("agendamentos");

        if (storedDays) {
          setMarkedDays(JSON.parse(storedDays));
        }
        if (storedAgendamentos) {
          setAgendamentos(JSON.parse(storedAgendamentos));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    loadData();
  }, []);

  const saveMarkedDays = async (newMarkedDays) => {
    setMarkedDays(newMarkedDays);
    await AsyncStorage.setItem("markedDays", JSON.stringify(newMarkedDays));
  };

  const saveAgendamentos = async (newAgendamentos) => {
    setAgendamentos(newAgendamentos);
    await AsyncStorage.setItem("agendamentos", JSON.stringify(newAgendamentos));
  };
  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDay(date);
  
    const dayAgendamentos = agendamentos.filter((item) => item.dtAgendamento === date);
  
    Alert.alert(
      "Marcar Dia",
      `O que deseja marcar para o dia ${date}?`,
      [
        {
          text: "Folga",
          onPress: () => {
            if (dayAgendamentos.length > 0) {
              Alert.alert("Erro", "Não é possível marcar folga em um dia com serviços agendados.");
              return;
            }
  
            const newMarkedDays = {
              ...markedDays,
              [date]: { selected: true, marked: true, dotColor: "orange" },
            };
            saveMarkedDays(newMarkedDays);
          },
        },
        {
          text: "Serviço",
          onPress: () => {
            navigation.navigate("Agendamento", {
              date,
              onSave: (newMarkedDays) => {
                // Atualiza as marcações no calendário ao salvar o agendamento
                setMarkedDays(newMarkedDays);
                saveMarkedDays(newMarkedDays);
              },
            });
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icones name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notificações")}>
          <Icones name="bell" size={28} color="#fff" />
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
          <Icones name="info" size={25} color="black" />
          <Text style={styles.notificationText}>
            Abaixo, você encontra a sua agenda com os dias em que terá serviço, além da opção de marcar os seus dias de folga e os dias trabalhados.
          </Text>
          <TouchableOpacity onPress={() => setShowNotification(false)}>
            <Icones name="x" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDays}
          minDate={new Date().toISOString().split("T")[0]}
          theme={{
            todayTextColor: "#FE914E",
            arrowColor: "#4E40A2",
            monthTextColor: "#4E40A2",
            textMonthFontWeight: "bold",
          }}
          style={styles.calendar}
        />
      </View>

      {selectedDay && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Dia Selecionado: {selectedDay}</Text>
          {agendamentos
            .filter((item) => item.dtAgendamento === selectedDay)
            .map((item, index) => (
              <View key={index} style={styles.agendamentoContainer}>
                <Text style={styles.agendamentoText}>
                  Cliente: {item.nomeCliente}
                </Text>
                <Text style={styles.agendamentoText}>
                  Horário: {item.hrAgendamento}
                </Text>
                <Text style={styles.agendamentoText}>
                  Endereço: {item.endereco}
                </Text>
              </View>
            ))}
        </View>
      )}
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
    marginHorizontal: 20, 
    marginVertical: 10, // Aumentei a margem superior e inferior
  },
  statusContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  agendamentoContainer: {
    marginVertical: 5,
  },
  agendamentoText: {
    fontSize: 14,
    color: "#333",
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
  calendar: {
    width: 380,
    height: 380, 
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
});
