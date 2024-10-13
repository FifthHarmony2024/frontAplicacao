import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Icones from 'react-native-vector-icons/Ionicons';

export default function NotificacaoPrest({ navigation }) {
  const [notificacao, setNotificacao] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={40}
            color="#ffffff"
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Icones
            name="notifications-outline"
            size={25}
            color="#ffffff"
            style={styles.notificationIcon}
          />
          <Text style={styles.headerText}>Notificações</Text>
        </View>
      </View>

      <View style={styles.centeredTextContainer}>
        <Text style={styles.nenhumaconverva}>
          Nenhuma novidade por aqui. Volte mais tarde.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4E40A2",
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  backIcon: {
    marginRight: 10,
    marginLeft: -20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 10, 
  },
  headerText: {
    fontSize: 25,
    color: "#FFF",
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nenhumaconverva: {
    fontSize: 20,
    color: "#C0C0C0",
    textAlign: 'center', 
    marginLeft:15
  }
});
