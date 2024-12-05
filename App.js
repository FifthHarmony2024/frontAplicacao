import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import Icones from 'react-native-vector-icons/Ionicons';
import FotoPerfil from "../frontAplicacao/src/Validacoes/FotoPerfil";
import { useFetchUserData } from '../frontAplicacao/src/Validacoes/useFetchUserData'; 

import Home from './src/telas/Home';
import Login from './src/telas/Prestador/Login/Login';
import Cadastro from './src/telas/Prestador/Cadastro/Cadastro';
import Confirmação from './src/telas/Prestador/Confirmação/Confirmação';
import TipoPerfil from './src/telas/TipoPerfil/Perfil';
import LoginCliente from './src/telas/Cliente/Login/LoginCliente';
import CadastroClie from './src/telas/Cliente/Cadastro/CadastroClie';
import ConfirmacaoCli from './src/telas/Cliente/ConfirmacaoCliente/ConfirmacaoCli';
import ConfirmacaoTel from './src/telas/Prestador/Confirmação/ConfirmacaoTel';
import ConfirmacaoClieTel from './src/telas/Cliente/ConfirmacaoCliente/ConfirmacaoClieTel';
import TermoUsoPrest from './src/telas/Prestador/TermoPres/TermoUsoPrest';
import TermoUsoCliente from './src/telas/Cliente/TermoClie/TermoUsoCliente';
import PerfilPrestador from './src/telas/Prestador/MeuPerfil/PerfilPrestador';
import Pedidos from './src/telas/Prestador/MeusPedidos/Pedidos';
import Agenda from './src/telas/Prestador/MinhaAgenda/Agenda';
import TelaServicos from './src/telas/Cliente/TelaServicos/TelaServicos';
import NotificacaoPrest from './src/telas/Prestador/NotificacaoPrestador/NotificacaoPrest';
import BuscaPesquisa from './src/telas/Cliente/Pesquisa/BuscaPesquisa';
import InfoPrestador from './src/telas/Prestador/Cadastro/InfoPrestador';
import ServicoPesq from './src/telas/Cliente/Pesquisa/ServicoPesq';
import ChatAgenda from './src/telas/Prestador/MinhaAgenda/ChatAgenda';
import AgendamentoScreen from './src/telas/Prestador/MinhaAgenda/AgendamentoScreen';
import DetalhesPrestador from './src/telas/Cliente/Pesquisa/DetalhesPrestador';
import VerTodos from './src/telas/Cliente/TelaServicos/VerTodos';
import ChatScreen from './src/telas/Cliente/ClienteChat/ChatScreen';
import ChatPrestador from './src/telas/Prestador/PrestadorChat/ChatPrestador';
import ListaClientesScreen from './src/telas/Prestador/PrestadorChat/ListaClientesScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { userData, loading } = useFetchUserData(); 

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <FotoPerfil />
        </View>
        
        {!loading && userData ? (
          <>
          <Text style={styles.profileName}>
            {userData.nome && userData.sobrenome 
              ? `${userData.nome} ${userData.sobrenome}` 
              : ''}
          </Text>
            <Text style={styles.profileSubtitle}>{userData.nomeComercial || "Nome Comercial"}</Text>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#4E40A2', 
        },
        drawerActiveTintColor: '#fff', 
        drawerInactiveTintColor: '#d1d1d1', 
      }}
    >
      <Drawer.Screen
        name="Início"
        component={PerfilPrestador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Meus Pedidos"
        component={Pedidos}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="clipboard" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Minha Agenda"
        component={Agenda}
        options={{
          drawerIcon: ({ color }) => (
            <Icones name="calendar-outline" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Notificações"
        component={NotificacaoPrest}
        options={{
          drawerIcon: ({ color }) => (
            <Icones name="notifications-outline" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
       <Drawer.Screen
        name="Sair"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="log-out" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#F5F5F5' barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={TipoPerfil} options={{ headerShown: false }} />
        <Stack.Screen name="EntrarLoginPrestador" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CadPrestador" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirPrestador" component={Confirmação} options={{ headerShown: false }} />
        <Stack.Screen name="EntrarLoginCliente" component={LoginCliente} options={{ headerShown: false }} />
        <Stack.Screen name="CadCliente" component={CadastroClie} options={{ headerShown: false }} />
        <Stack.Screen name="ConfiClie" component={ConfirmacaoCli} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirPresTel" component={ConfirmacaoTel} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirClieTel" component={ConfirmacaoClieTel} options={{ headerShown: false }} />
        <Stack.Screen name="TermoPrestador" component={TermoUsoPrest} options={{ headerShown: false }} />
        <Stack.Screen name="TermoCliente" component={TermoUsoCliente} options={{ headerShown: false }} />
        <Stack.Screen name="TelaServ" component={TelaServicos} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroPres2" component={InfoPrestador} options={{ headerShown: false }} />
        <Stack.Screen name="AgendaCHAT" component={ChatAgenda} options={{ headerShown: false }} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuscaPesquisa" component={BuscaPesquisa} options={{headerShown: false }} />
        <Stack.Screen name="ServicoPesq" component={ServicoPesq} options={{ headerShown: false}} />
        <Stack.Screen name="DetalhesPrestador" component={DetalhesPrestador} options={{ headerShown: false}} />
        <Stack.Screen name="VerTodos" component={VerTodos} options={{ headerShown: false}} />
        <Stack.Screen name="ChatCliente" component={ChatScreen} options={{ headerShown: false}} />
        <Stack.Screen name="ListaClientes" component={ListaClientesScreen} options={{ headerShown: false}} />
        <Stack.Screen name="ChatPrestador" component={ChatPrestador} options={{ headerShown: false}} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 34,
    marginTop:-5,
    backgroundColor: '#F5F5F5', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop:11
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#777',
  },
});
