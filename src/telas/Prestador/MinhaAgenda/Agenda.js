import React, { useState ,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import Icones from 'react-native-vector-icons/Feather';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import NotIcone from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import API_CONFIG_URL from "../../../Validacoes/ipConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando AsyncStorage
import axios from 'axios';

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
    const [userAddress, setUserAddress] = useState(null); 
    const [userData, setUserData] = useState(null);  
    useEffect(() => {
        // Recuperar o ID do usuário do AsyncStorage assim que o componente for montado
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setIdUsuario(storedUserId);  // Armazena o ID no estado
                } else {
                    console.log("ID de usuário não encontrado");
                }
            } catch (error) {
                console.error('Erro ao recuperar o ID do usuário:', error);
            }
        };
        fetchUserId();
    }, []);
    

    const marcarDia = (day) => {
        setSelectedDay(day.dateString); 
        setModalVisible(true);  
    };

    const handleOptionSelect = async (option) => {
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

            // Chama a função para marcar folga e enviar os dados para o backend
            await marcarFolga(selectedDay);
        }
        setModalVisible(false);
    };
    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const parsedData = JSON.parse(data);
                    setUserData(parsedData); // Armazenar os dados do usuário

                    console.log("Dados armazenados no AsyncStorage:", parsedData);
                }
            } catch (error) {
                console.error("Erro ao recuperar dados do usuário:", error);
            }
        }
        fetchUserData();
    }, []);

    const marcarFolga = async (diaFolga) => {
        try {
            if (!userData || !userData.id) {
                console.error('ID do usuário não encontrado');
                return;
            }
    
            const idUsuario = userData.id;
            // Formatar para 'yyyy-MM-dd' sem horas, minutos ou UTC
            const data = new Date(diaFolga).toISOString().split('T')[0];  // '2024-12-13'
    
            const response = await axios.post(
                `${API_CONFIG_URL}agenda/marcar-folga?idUsuario=${idUsuario}&diaServico=${data}`
            );
    
            if (response.status === 200) {
                console.log('Folga marcada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao marcar folga:', error);
        }
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
                        marcarDia(day);
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
        marginBottom: 10,  // Ajuste aqui para dar espaço em baixo
        height: 400,
    },
    servicosContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30, // Reduzido de 60 para 30
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    servicoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E40A2',
        marginBottom: 15,
    },
    noServiceText: {
        fontSize: 16,
        color: '#999',
    },
    notification: {
        backgroundColor: '#EEEEEE',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 20,
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 14,
        color: '#282828',
        flex: 1,
        marginLeft: 10,
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
