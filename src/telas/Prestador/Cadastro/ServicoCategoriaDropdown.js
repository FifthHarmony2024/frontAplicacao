import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { buscarServicosPorCategoria } from '../../../Validacoes/servicosService'; 
import styles from '../../EstiloPrestador/estilos';

const ServicoCategoriaDropdown = ({ selectedCategoria, selectedServico, onServicoChange }) => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servicoFocus, setServicoFocus] = useState(false);

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

  useEffect(() => {
    setServicoFocus(false);
  }, [selectedServico]);

  if (loading) {
    return <Text>Carregando serviços...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderLabelServico = () => {
    if (selectedServico || servicoFocus) {
      return (
        <Text
          style={[
            styles.label,
            { top: -10, left: 15, fontSize: 12, color: servicoFocus ? 'blue' : '#4E40A2' },
          ]}
        >
          Serviço
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.dropdownContainer}>
      {renderLabelServico()}
      <Dropdown
        style={[styles.dropdown, servicoFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={servicos}
        search={false}
        maxHeight={300}
        labelField="nomeServico"
        valueField="idServico"  
        placeholder={!servicoFocus ? 'Selecione um serviço' : '...'}
        value={selectedServico}
        onFocus={() => setServicoFocus(true)}
        onBlur={() => setServicoFocus(false)}
        onChange={item => {
          onServicoChange(item.idServico); 
          setServicoFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={servicoFocus ? '#4E40A2' : '#8A8A8A'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default ServicoCategoriaDropdown;
