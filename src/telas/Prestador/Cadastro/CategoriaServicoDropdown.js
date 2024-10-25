import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { buscarCategorias } from '../../../Validacoes/categoriasService';
import styles from '../../EstiloPrestador/estilos';

const CategoriaServicoDropdown = ({ selectedValue, onValueChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaFocus, setCategoriaFocus] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await buscarCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setError('Erro ao buscar categorias');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return <Text>Carregando categorias...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderLabelCategoria = () => {
    if (selectedValue || categoriaFocus) {
      return (
        <Text
          style={[
            styles.label,
            { top: -10, left: 15, fontSize: 12, color: categoriaFocus ? 'blue' : '#4E40A2' },
          ]}
        >
          Categoria
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.dropdownContainer}>
      {renderLabelCategoria()}
      <Dropdown
        style={[styles.dropdown, categoriaFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categorias}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!categoriaFocus ? 'Selecione uma categoria' : '...'}
        value={selectedValue} 
        onFocus={() => setCategoriaFocus(true)}
        onBlur={() => setCategoriaFocus(false)}
        onChange={item => {
          onValueChange(item.value); // Chama a função passada para atualizar o valor selecionado
          setCategoriaFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={categoriaFocus ? '#4E40A2' : '#8A8A8A'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default CategoriaServicoDropdown;
