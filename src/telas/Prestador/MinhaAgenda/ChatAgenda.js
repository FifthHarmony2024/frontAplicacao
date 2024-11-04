import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import NotIcone from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function Agenda({ navigation }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [markedDays, setMarkedDays] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const marcarDia = (day) => {
        setSelectedDay(day.dateString); 
        setModalVisible(true);  
    };

    const handleOptionSelect = (option) => {
        if (option === "Dia de Trabalho") {
            setMarkedDays((prev) => ({
                ...prev,
                [selectedDay]: { selected: true, selectedColor: '#4E40A2', workDay: true },
            }));
        } else if (option === "Folga") {
            setMarkedDays((prev) => ({
                ...prev,
                [selectedDay]: { selected: true, selectedColor: '#FE914E', workDay: false },
            }));
        }
        setModalVisible(false);  
    };

    const renderServicos = () => {
        if (!selectedDay) {
            return <Text style={styles.noServiceText}>Selecione um dia para ver mais detalhes</Text>;
        }

        const dayMarked = markedDays[selectedDay];
        if (dayMarked) {
            return dayMarked.workDay 
                ? <Text style={styles.noServiceText}>Dia de Trabalho: Agende os serviços pelo Back-end.</Text>
                : <Text style={styles.noServiceText}>Dia de Folga.</Text>;
        }

        return <Text style={styles.noServiceText}>Nenhum serviço ou status para este dia.</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Minha Agenda</Text>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={marcarDia}
                    markedDates={markedDays}
                    minDate={new Date().toISOString().split('T')[0]}
                    theme={{
                        backgroundColor: '#FFFFFF',
                        calendarBackground: '#FFFFFF',
                        todayTextColor: '#FE914E',
                        arrowColor: '#4E40A2',
                        monthTextColor: '#4E40A2',
                        textMonthFontWeight: 'bold',
                        textMonthFontSize: 20,
                        textDayFontSize: 16,
                        textDayHeaderFontSize: 14,
                        selectedDayBackgroundColor: '#6b4ce6',
                        selectedDayTextColor: '#ffffff',
                    }}
                />
            </View>

            <View style={styles.servicosContainer}>
                <Text style={styles.servicoTitulo}>
                    {selectedDay ? `Status para o dia ${selectedDay.split('-').reverse().join('/')}` : 'Selecione um dia para ver os serviços'}
                </Text>
                <ScrollView>{renderServicos()}</ScrollView>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Marcar o dia</Text>
                        <Text style={styles.modalSubtitle}>Escolha uma opção:</Text>
                        <TouchableOpacity onPress={() => handleOptionSelect("Dia de Trabalho")}>
                            <Text style={styles.modalOption}>Dia de Trabalho</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOptionSelect("Folga")}>
                            <Text style={styles.modalOption}>Folga</Text>
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
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#6b4ce6',
        padding: 20,
        alignItems: 'center',
        marginTop:50
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    calendarContainer: {
        margin: 20,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
    },
    servicosContainer: {
        backgroundColor: '#e6d9fc',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
    },
    servicoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E40A2',
        marginBottom: 10,
    },
    noServiceText: {
        fontSize: 16,
        color: '#555',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
        color: '#4E40A2',
    },
    modalCancel: {
        fontSize: 16,
        color: '#FE914E',
        marginTop: 20,
    },
});
