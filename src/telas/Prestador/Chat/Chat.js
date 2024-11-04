import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Icones from 'react-native-vector-icons/Entypo';

export default function Chat({ navigation }) {
  // Lista de conversas (vazia por enquanto)
  const [conversas, setConversas] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="chevron-left"
          size={40}
          color="#ffffff"
          onPress={() => navigation.goBack('Meus Pedidos')}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Conversas</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Icon
            name="search"
            size={20}
            color="#282828"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar....."
            placeholderTextColor="#C0C0C0"
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonSelected}>
          <Text style={styles.filterTextSelected}>Não lidas</Text>
        </TouchableOpacity>
      </View>

      {conversas.length > 0 ? (
        <FlatList
          data={conversas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.conversationItem}>
              <Text style={styles.conversationText}>
                {item.nomeCliente} - {item.tipoPedido}
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.noConversations}>
            <Icones
            name="chat"
            size={100}
            color="#D9D2E1"
            style={styles.iconeChatVazio}
          />
          <Text style={styles.noConversationsText}>
            Você ainda não possui contatos
          </Text>

          <Text style={styles.cadastroTexto}>
                        Ver contatos <Text style={styles.cadastroLink} onPress={() => navigation.navigate('ChatDentro')}>Contatos</Text>
             </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#000",
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backIcon: {
    marginRight: 10,
    marginLeft:-20
    
  },
  headerText: {
    fontSize: 25,
    color: "#FFF",
  },
  searchContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#D1C4E9", 
    marginHorizontal: 5,
  },
  filterText: {
    color: "#000",
    fontSize: 14,
  },
  filterTextSelected: {
    color: "#000",
    fontSize: 14,
    fontWeight: 'bold',
  },
  noConversations: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noConversationsText: {
    fontSize: 16,
    color: "#C0C0C0",
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  conversationText: {
    fontSize: 16,
    color: "#000",
  },
  iconeChatVazio:{
    marginTop:-50
  }
});
