import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Icones from 'react-native-vector-icons/Ionicons';

export default function Notificacao(){
    const [notificacao, setNotificacao] = useState([]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        
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
        backgroundColor: "#7B68EE",
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
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
        fontSize: 18,
        color: "#C0C0C0",
        textAlign: 'center', 
        marginLeft:15
      }
});
