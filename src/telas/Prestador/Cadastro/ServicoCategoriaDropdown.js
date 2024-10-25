import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { buscarServicosPorCategoria } from '../../../Validacoes/servicosService';

const ServicoCategoriaDropdown = ({ selectedCategoria, selectedServicos = [], onServicoChange }) => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchServicos = async () => {
      if (selectedCategoria) {
        try {
          const servicosData = await buscarServicosPorCategoria(selectedCategoria);
          setServicos(servicosData);
        } catch (error) {
          console.error('Erro ao buscar serviços:', error);
          setError('Erro ao buscar serviços');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchServicos();
  }, [selectedCategoria]);

  const toggleServicoSelection = (idServico) => {
    let updatedSelection = [...selectedServicos];
    if (updatedSelection.includes(idServico)) {
      updatedSelection = updatedSelection.filter(id => id !== idServico);
    } else {
      updatedSelection.push(idServico);
    }
    onServicoChange(updatedSelection);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>Selecione Serviços</Text>
      </TouchableOpacity>
      <Text style={styles.selectedCount}>{selectedServicos.length} serviços selecionados</Text>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Selecione Serviços</Text>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
              {loading ? (
                <Text style={styles.loadingText}>Carregando serviços...</Text>
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                servicos.map(servico => (
                  <TouchableOpacity
                    key={servico.idServico}
                    style={[
                      styles.checkboxContainer,
                      selectedServicos.includes(servico.idServico) && styles.selectedCheckbox,
                    ]}
                    onPress={() => toggleServicoSelection(servico.idServico)}
                  >
                    <AntDesign
                      name={selectedServicos.includes(servico.idServico) ? 'checksquare' : 'checksquareo'}
                      size={20}
                      color={selectedServicos.includes(servico.idServico) ? '#4E40A2' : '#8A8A8A'}
                    />
                    <Text
                      style={[
                        styles.servicoText,
                        selectedServicos.includes(servico.idServico) && styles.selectedServicoText,
                      ]}
                    >
                      {servico.nomeServico}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  selectedCount: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  selectButton: {
    backgroundColor: '#4E40A2',
    padding: 15,
    borderRadius: 18, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4E40A2',
  },
  scrollContainer: {
    maxHeight: 300,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 6,
    backgroundColor: '#f9f9f9',
  },
  selectedCheckbox: {
    backgroundColor: '#e3e3f3',
  },
  servicoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectedServicoText: {
    fontWeight: 'bold',
    color: '#4E40A2',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4E40A2',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  closeButton: {
    backgroundColor: '#4E40A2',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServicoCategoriaDropdown;
