import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons, Octicons, Feather , FontAwesome5, FontAwesome} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import BarraPesquisa from '../../Estilos/BarraPesquisa';
import PedidosCliente from '../Pedidos/PedidosCliente';
import Pesquisa from '../Pesquisa/PesquisaClie';
import Notificacao from '../Notificacao/Notificacao';
import PerfilCliente from '../Perfil/PerfilCliente';

import consertoTV from '../../../../assets/Conserto-de-televisor.jpg';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TelaInicio = () => {
  const services = [
    { label: 'Assistência Técnica', icon: { type: FontAwesome, name: 'gears' } }, 
    { label: 'Aulas', icon: { type: FontAwesome5, name: 'book' } },                          
    { label: 'Eventos', icon: { type: FontAwesome5, name: 'glass-cheers' } },                 
    { label: 'Saúde', icon: { type: FontAwesome5, name: 'heart' } },          
    { label: 'Reformas e Reparos', icon: { type: Ionicons, name: 'construct-outline' } },                                        
    { label: 'Serviços Gerais', icon: { type: FontAwesome5, name: 'briefcase' } },            
    { label: 'Serviços Domésticos', icon: { type: Ionicons, name: 'home' } },                 
    { label: 'Transporte', icon: { type: FontAwesome5, name: 'car' } },                    
];


  
  return (
    <ScrollView style={styles.screenContainer}>
      <TouchableOpacity style={styles.addressContainer} onPress={() => alert('Selecione o endereço')}>
        <Text style={styles.addressText}>Adicionar endereço</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image source={require('../../../../assets/nomepreto.png')} style={styles.logo} />
        <FontAwesome5 name="user-circle" size={45} color="#89958F" style={styles.userIcon} />

      </View>


      <Text style={styles.welcomeText}>Olá, nome da pessoa</Text>

      <BarraPesquisa />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
          {services.map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceButton} onPress={() => alert(service.label)}>
                  <View style={styles.iconCircle}>
                      <service.icon.type name={service.icon.name} size={24} color="#7B68EE" />
                  </View>
                  <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
          ))}
     </ScrollView>


      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Assistência Técnica</Text>
        <TouchableOpacity onPress={() => alert('Ver todos Assistência Técnica')}>
          <Text style={styles.viewAllLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryCard}>
          <Text>Aparelhos Eletrônicos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Image source={consertoTV} style={styles.categoryImage} />
          <Text>Televisão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Text>Geladeira e Freezer</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reformas e Reparos</Text>
        <TouchableOpacity onPress={() => alert('Ver todos Reformas e Reparos')}>
          <Text style={styles.viewAllLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryCard}>
          <Text>Encanador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Text>Eletricista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Text>Pintor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Conheça alguns perfis</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>Nome - Profissão</Text>
          <Text style={styles.profileSnippet}>Um trecho do anúncio</Text>
          <TouchableOpacity style={styles.catalogButton}>
            <Text style={styles.catalogButtonText}>Ver catálogo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>Nome - Profissão</Text>
          <Text style={styles.profileSnippet}>Um trecho do anúncio</Text>
          <TouchableOpacity style={styles.catalogButton}>
            <Text style={styles.catalogButtonText}>Ver catálogo</Text>
          </TouchableOpacity>
        </View>
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
  servicesContainer: {
    marginVertical: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4, 
    marginHorizontal: 8, 
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', // Para a imagem preencher melhor
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileSnippet: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
  },
  catalogButton: {
    backgroundColor: '#4E40A2',
    paddingVertical: 10,
    borderRadius: 5,
  },
  catalogButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
  tabBar: {
    height: 65,
    backgroundColor: '#7B68EE',
    borderRadius: 15,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllLink: {
    fontSize: 14,
    color: '#7B68EE',
  },
  arrowIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  userIcon: {
    marginLeft: 10,
    marginTop:-25,
    
  },
  
});
