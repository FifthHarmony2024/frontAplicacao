import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import TelaServicos from './src/telas/Cliente/TelaServicos/TelaServicos'
import Chat from './src/telas/Prestador/Chat/Chat';
import NotificacaoPrest from './src/telas/Prestador/NotificacaoPrestador/NotificacaoPrest';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Início" component={PerfilPrestador}  options={{ headerShown: false }} />
      <Drawer.Screen name="Meus Pedidos" component={Pedidos}  options={{ headerShown: false }} />
      <Drawer.Screen name="Minha Agenda" component={Agenda}  options={{ headerShown: false }} />
      <Drawer.Screen name="Notificações" component={NotificacaoPrest}  options={{ headerShown: false }} />

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
        <Stack.Screen name="Conversas" component={Chat} options={{ headerShown: false }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
