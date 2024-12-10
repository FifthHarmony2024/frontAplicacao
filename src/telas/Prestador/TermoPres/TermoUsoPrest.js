import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Switch, Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function TermoUsoPrest({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false); 
  const [messageVisible, setMessageVisible] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setMessageVisible(false); 
  };

  const handleAccept = () => {
    if (!isEnabled) {
      setMessageVisible(true);
    } else {
      navigation.navigate('EntrarLoginPrestador'); 
    }
  };

  const handleDecline = () => {
    setMessageVisible(true); 
  };

  const openLink1 = () => {
    const url = "https://docs.google.com/document/d/1ftAaFekaiptRFh6tzaqenGgGqMlQbI5Tynxl8e4fTI0/edit?tab=t.0";
    Linking.openURL(url).catch(err =>
      console.error("Não foi possível abrir o link:", err)
    );
  };

  const openLink2 = () => {
    const url = "https://docs.google.com/document/d/1WQKr_fPUbK4L7Q4cCGodtwi2CxhzXmlBaMmvWPb_kDQ/edit?tab=t.0";
    Linking.openURL(url).catch(err =>
      console.error("Não foi possível abrir o link:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Termos de Uso</Text>

      <View style={styles.containerProgresso}>
        <View style={styles.circulo}>
          <AntDesign name="check" size={20} color="#FFF" />
        </View>
        <View style={styles.linha} />
        <View style={styles.circulo}>
          <AntDesign name="check" size={20} color="#FFF" />
        </View>
        <View style={styles.linhaInativa} />
        <View style={styles.circuloAtivo}>
          <View style={styles.circuloInterno} />
        </View>
      </View>

      <View style={styles.fundo}>
        <Text style={styles.textoPrincipal}>
          Para continuar utilizando o aplicativo é necessário ler e aceitar nossos termos de uso.
        </Text>

        <Text style={styles.link} onPress={openLink1}>
          Termos de Uso - Documento 1
        </Text>
        <Text style={styles.link} onPress={openLink2}>
          Termos de Uso - Documento 2
        </Text>

        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#767577', true: '#4E40A2' }}
            thumbColor={isEnabled ? '#FE914E' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.switchLabel}>
            Declaro que li e aceito os termos de uso.
          </Text>
        </View>
      </View>

      {messageVisible && (
        <Text style={styles.errorMessage}>
          Enquanto você não aceitar os termos de uso, o aplicativo ficará inutilizável.
        </Text>
      )}

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleDecline}>
          <Text style={styles.botaoTexto}>Não Aceito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleAccept}>
          <Text style={styles.botaoTexto}>Aceito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E40A2',
  },
  titulo: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 60,
    marginTop: 5,
  },
  fundo: {
    backgroundColor: '#F0EBE0',
    width: '88%',
    height: 480,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  containerProgresso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: -35,
    justifyContent: 'space-between',
    width: '80%',
  },
  circulo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FE914E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuloAtivo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FE914E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuloInterno: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FE914E',
  },
  linha: {
    width: 100,
    height: 2,
    backgroundColor: '#FE914E',
    marginHorizontal: 10,
  },
  linhaInativa: {
    width: 100,
    height: 2,
    backgroundColor: '#FE914E',
    marginHorizontal: 10,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    width: '45%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    fontSize: 18,
    color: '#282828',
    fontWeight: 'bold',
  },
  textoPrincipal: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#4E40A2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  errorMessage: {
    color: '#FFFFFF',
    width: '85%',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
