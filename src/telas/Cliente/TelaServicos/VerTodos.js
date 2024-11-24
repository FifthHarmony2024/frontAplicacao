import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icones from 'react-native-vector-icons/Feather';
import { buscarServicosPorCategoria } from '../../../Validacoes/servicosService'; 

const VerTodos = ({ navigation }) => {
  const route = useRoute();
  const { idCategoria } = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await buscarServicosPorCategoria(idCategoria);
        setServices(data);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [idCategoria]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando serviços...</Text>
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum serviço encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icones
          style={styles.seta}
          name="chevron-left"
          size={40}
          color="#ffffff"
          onPress={() => navigation.goBack('TelaServ')}
        />
        <Text style={styles.headerTitle}>Serviços Disponíveis</Text>
      </View>
      {services.map((service, index) => (
        <TouchableOpacity
          key={service.idServico || index}
          style={styles.serviceCard}
          onPress={() => navigation.navigate('DetalhesServico', { idServico: service.idServico })}
        >
          <View style={styles.serviceContent}>
            <Text style={styles.serviceName}>{service.nomeServico}</Text>
            <Text style={styles.serviceDescription}>{service.descricaoServico}</Text>
          </View>
          <Icones name="chevron-right" size={24} color="#666" style={styles.serviceIcon} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4E40A2',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 40,
  },
  seta: {
    marginRight: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerIcon: {
    position: 'absolute',
    right: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  serviceIcon: {
    marginLeft: 8,
  },
});

export default VerTodos;
