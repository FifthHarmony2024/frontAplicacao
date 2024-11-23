import React from 'react';
import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

const DetalhesPrestador = ({ route }) => {
    const { prestador } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: prestador.fotoPerfil || 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{prestador.nomeComercial}</Text>
                <Text style={styles.info}>⭐ {prestador.estrelas || 0}</Text>
            </View>
            <Text style={styles.description}>{prestador.descricao || 'Descrição indisponível'}</Text>
            <Text style={styles.subHeader}>Serviços que atende</Text>
            <FlatList
                data={prestador.servicos || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            />

            <View style={styles.chatContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Conversas')}>
                    <Icons style={styles.chatIcon} name="chatbubbles-outline" size={70} color="#FE914E" />
                </TouchableOpacity>
                <Text style={styles.chatText}>Entrar no Chat</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    info: {
        fontSize: 16,
        color: '#777',
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    item: {
        fontSize: 14,
        marginBottom: 4,
    },
    chatContainer: {
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        alignItems: 'center',
    },
    chatText: {
        color: '#FE914E',
        marginTop: 5,
    },
   
});

export default DetalhesPrestador;
