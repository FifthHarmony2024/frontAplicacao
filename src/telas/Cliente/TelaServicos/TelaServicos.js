import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Image, ScrollView,Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons, Octicons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


import BarraPesquisa from '../../Estilos/BarraPesquisa';
import PedidosCliente from '../Pedidos/PedidosCliente';
import Pesquisa from '../Pesquisa/PesquisaClie';
import Notificacao from '../Notificacao/Notificacao';
import PerfilCliente from '../Perfil/PerfilCliente';
import pedreiros from './../../../../assets/pedreiro.jpeg';
import gesso from '../../../../assets/gesso.jpg';
import eletricista from '../../../../assets/eletricista.png';
import pintor from '../../../../assets/pintor.jpg';
import dedetizador from '../../../../assets/dedetizador.png';
import desentupidor from '../../../../assets/desentupidor.jpg';
import chaveiro from '../../../../assets/chaveiro.jpg';
import cabeleireiros from '../../../../assets/cabelereiro.jpg';
import manicure from '../../../../assets/manicure.jpg';
import trancista from '../../../../assets/trancista.jpg';
import design from '../../../../assets/design.jpg';
import maquiadores from '../../../../assets/maquiadores.jpg';
import televisao from '../../../../assets/televisao.jpg';
import ar from '../../../../assets/ar.jpg';
import camera from '../../../../assets/camera.jpg';
import redes from '../../../../assets/redes.jpg';
import geladeira from '../../../../assets/geladeira.jpg';


const Tab = createBottomTabNavigator();

const TelaInicio = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); // dados com o token
  const [userAddress, setUserAddress] = useState(null); // dados gerais


    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const parsedData = JSON.parse(data);
                    setUserData(parsedData);
                }
            } catch (error) {
                console.error("Erro ao recuperar dados do usuário:", error);
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
      async function fetchUserAddress() {
        try {
          const data = await AsyncStorage.getItem('userData');
          if (data) {
            const parsedData = JSON.parse(data);
            const idUsuario = parsedData.id; 
  
            const response = await fetch(`http://192.168.0.2:8080/usuarios/${idUsuario}/perfil`);
            const addressData = await response.json();
            setUserAddress(addressData);
          }
        } catch (error) {
          console.error("Erro ao recuperar endereço do usuário:", error);
        }
      }
  
      fetchUserAddress();
    }, []);
    
    const services = [
      { label: 'Assistência Técnica', icon: { type: FontAwesome, name: 'gears' }, idCategoria: 1 },
      { label: 'Aulas', icon: { type: FontAwesome5, name: 'book' }, idCategoria: 2 },
      { label: 'Eventos', icon: { type: FontAwesome5, name: 'glass-cheers' }, idCategoria: 5 },
      { label: 'Saúde', icon: { type: FontAwesome5, name: 'heart' }, idCategoria: 6 },
      { label: 'Reformas e Reparos', icon: { type: Ionicons, name: 'construct-outline' }, idCategoria: 3 },
      { label: 'Serviços Gerais', icon: { type: FontAwesome5, name: 'briefcase' }, idCategoria: 7 },
      { label: 'Serviços Domésticos', icon: { type: Ionicons, name: 'home' }, idCategoria: 4 },
      { label: 'Transporte', icon: { type: FontAwesome5, name: 'car' }, idCategoria: 8 },
      { label: 'Moda e Beleza', icon: { type: FontAwesome5, name: 'cut' }, idCategoria: 9 },
    ];
    

  return (
    <ScrollView>
        <View style={styles.screenContainer}>
                <TouchableOpacity style={styles.addressContainer}>
                <Text style={styles.addressText}>
                      {userAddress 
                        ? `${userAddress.endereco}, Nº ${userAddress.numResidencial} - CEP: ${userAddress.cep}`
                        : "Carregando endereço..."}
                </Text>

                </TouchableOpacity>

                <View style={styles.headerContainer}>
                  <Image source={require('../../../../assets/nomepreto.png')} style={styles.logo} />
                  <FontAwesome5 name="user-circle" size={45} color="#89958F" style={styles.userIcon} />
                </View>

                <Text style={styles.welcomeText}>Olá, {userData?.nome || "Usuário"}! </Text>

                <BarraPesquisa />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
                      {services.map((service) => (
                        <TouchableOpacity
                          key={service.idCategoria} 
                          style={styles.serviceButton} 
                          onPress={() => navigation.navigate('VerTodos', { idCategoria: service.idCategoria })} 
                        >
                          <View style={styles.iconCircle}>
                            <service.icon.type name={service.icon.name} size={24} color="#7B68EE" />
                          </View>
                          <Text style={styles.serviceLabel}>{service.label}</Text>
                        </TouchableOpacity>
                      ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                  <Text style={styles.categorias}>Reformas e Reparos</Text>
                  <TouchableOpacity style={styles.verTodosButton} onPress={() => alert('Ver todos os serviços')}>
                    <Text style={styles.verTodosText}>Ver Todos</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.card}>
                      <Image source={pedreiros} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Pedreiro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={gesso} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Gesso e DryWall</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={eletricista} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Eletricista</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={pintor} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Pintor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={dedetizador} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Dedetizador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={desentupidor} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Desentupidor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={chaveiro} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Chaveiro</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                <View style={styles.sectionHeader}>
                  <Text style={styles.categoriaModa}>Moda e Beleza</Text>
                  <TouchableOpacity style={styles.verTodosButton} onPress={() => alert('Ver todos os serviços')}>
                    <Text style={styles.verTodosText}>Ver Todos</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.card}>
                      <Image source={cabeleireiros} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Cabeleireiros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={maquiadores} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Maquiadores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={design} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Design de Sobrancelhas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={manicure} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Manicure e Pedicure</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={trancista} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Trancistas</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                <View style={styles.sectionHeader}>
                  <Text style={styles.categorias}>Assistência Técnica</Text>
                  <TouchableOpacity style={styles.verTodosButton} onPress={() => alert('Ver todos os serviços')}>
                    <Text style={styles.verTodosText}>Ver Todos</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.card}>
                      <Image source={televisao} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Televisão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={ar} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Ar Condicionado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={camera} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Câmera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={geladeira} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Geladeira e Freezer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                      <Image source={redes} style={styles.pedreiro} resizeMode="cover" />
                      <Text style={styles.cardTitle}>Cabeamento de Redes</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                
        </View>
        
  </ScrollView>

  );
};

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0.7, translateY: 8 }, 1: { scale: 1.2, translateY: -8 } });
      iconRef.current.animate({ 0: { rotate: '0deg' }, 1: { rotate: '360deg' } });
      textRef.current.transitionTo({ opacity: 1, translateY: 0 });
    } else {
      viewRef.current.animate({ 0: { scale: 1.2, translateY: -8 }, 1: { scale: 1, translateY: 8 } });
      iconRef.current.animate({ 0: { rotate: '360deg' }, 1: { rotate: '0deg' } });
      textRef.current.transitionTo({ opacity: 0, translateY: 20 });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.tabButton}>
        <Animatable.View ref={iconRef} style={styles.iconContainer}>
          <item.iconType name={item.iconName} size={focused ? 26 : 23} color={focused ? '#fff' : '#4E40A2'} />
        </Animatable.View>
        <Animatable.Text ref={textRef} style={[styles.tabLabel, { opacity: focused ? 1 : 0 }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: -35,
    marginRight:8
  },
  addressContainer: {
    backgroundColor: '#e6e6fa',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addressText: {
    color: '#4E40A2',
    fontSize: 14,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -55,
    marginLeft: 8,
  },
  tabBar: {
    height: 65,
    backgroundColor: '#7B68EE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 65,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceScroll: {
    paddingHorizontal: 0,
  },
  serviceButton: {
    alignItems: 'center',
    marginRight: 30
  },
  iconCircle: {
    backgroundColor: '#e6e6fa',
    borderRadius: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    elevation: 2,
  },
  serviceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    color: '#4E40A2',
    maxWidth: 100,
    flexWrap: 'wrap',
  },

  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#fff',
    marginTop: 5,
  },
  categoriaModa:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:18,
    marginRight:10
  },
  categorias:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:18,
    marginRight:10
  },
  arrowIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  userIcon: {
    marginLeft: 10,
    marginTop:-25,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: 143,  
    backgroundColor: '#fff',
    borderRadius: 12,  
    alignItems: 'center',
    elevation: 4,  
    shadowColor: '#000',  
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginRight: 10, 
  },

  pedreiro: {
    width: '100%', 
    height: 110, 
    borderTopLeftRadius: 12,  
    borderTopRightRadius: 12,  

  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 18,
  },
  categoriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  verTodosButton: {
    flexDirection: 'row',
    marginTop:20
  },
  verTodosText: {
    fontSize: 14,
    color: '#4E40A2',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

});


export default function AppNavigator() {
  const tabs = [
    { name: 'Início', label: 'Início', iconType: Ionicons, iconName: 'home', component: TelaInicio },
    { name: 'Pesquisa', label: 'Pesquisa', iconType: Feather, iconName: 'search', component: Pesquisa },
    { name: 'Pedidos', label: 'Pedidos', iconType: SimpleLineIcons, iconName: 'handbag', component: PedidosCliente },
    { name: 'Notificações', label: 'Notificações', iconType: Ionicons, iconName: 'notifications', component: Notificacao },
    { name: 'Perfil', label: 'Perfil', iconType: Octicons, iconName: 'person', component: PerfilCliente },

  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {tabs.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}

      
    </Tab.Navigator>
  );
  
}
