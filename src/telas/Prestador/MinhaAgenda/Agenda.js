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
    const [showNotification, setShowNotification] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const marcarDia = (day) => {
        setSelectedDay(day);
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
        if (dayMarked && dayMarked.workDay) {
            return <Text style={styles.noServiceText}>Dia de Trabalho: Agende os serviços pelo Back-end.</Text>;
        } else if (dayMarked && !dayMarked.workDay) {
            return <Text style={styles.noServiceText}>Dia de Folga.</Text>;
        }

        return <Text style={styles.noServiceText}>Nenhum serviço ou status para este dia.</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icones name="menu" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
                    <Icones style={styles.notificacao} name="bell" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Início')}>
                    <Text style={styles.navText}>Meu Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Meus Pedidos')}>
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
                    onDayPress={day => {
                        marcarDia(day.dateString);
                    }}
                    markedDates={markedDays}
                    minDate={new Date().toISOString().split('T')[0]}
                    hideExtraDays={false}  
                    theme={{
                        backgroundColor: '#F5F5F5',
                        calendarBackground: '#F5F5F5',
                        todayTextColor: '#FE914E',
                        arrowColor: '#4E40A2',
                        monthTextColor: '#4E40A2',
                        textMonthFontWeight: 'bold',
                        textMonthFontSize: 30,
                        textDayFontSize: 18,  
                        textDayHeaderFontSize: 16,  
                    }}
                />
            </View>

            <View style={styles.servicosContainer}>
                <Text style={styles.servicoTitulo}>
                    {selectedDay ? `Status para o dia ${new Date(selectedDay).toLocaleDateString('pt-BR')}` : 'Selecione um dia para ver os serviços'}
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
                        <TouchableOpacity onPress={() => handleOptionSelect("Editar um Trabalho")}>
                            <Text style={styles.modalOption}>Editar um Trabalho</Text>
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
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4E40A2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 60,
    },
    notificacao: {
        marginRight: 10,
        paddingTop: 12,
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#4E40A2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -5,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    navTextActive: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navIndicator: {
        marginTop: 5,
        width: '100%',
        height: 3,
        backgroundColor: '#FE914E',
    },
    calendarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        height: 400,
    },
    servicosContainer: {
        paddingHorizontal: 20,
        paddingVertical: 60,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        minHeight: 150, 
    },
    servicoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E40A2',
        marginBottom: 10,
        textAlign: 'center',
        marginTop:-20
    },
    noServiceText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        padding: 12,
        margin: 10,
        borderRadius: 10,
        marginTop:2
    },
    notificationText: {
        flex: 1,
        marginLeft: 10,
        color: '#333333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
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
        marginTop: 20,
        color: '#FF0000',
    },
});
