import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios'; // ou fetch, dependendo da sua preferência

const CategoriaServicoDropdown = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [servicosCategorias, setServicosCategorias] = useState({});
    const [categoriaFocus, setCategoriaFocus] = useState(false);

    useEffect(() => {
        // Fazendo chamada ao back-end para buscar categorias
        axios.get('http://192.168.0.6:8080/categorias')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível carregar as categorias.");
            });
    }, []);

    const handleCategoriaChange = (item) => {
        if (categoriasSelecionadas.length >= 3) {
            Alert.alert("Limite Excedido", "Você pode selecionar no máximo 3 categorias.");
            return;
        }
        setCategoriasSelecionadas([...categoriasSelecionadas, item.value]);
        // Carregar os serviços dessa categoria
        axios.get('http://192.168.0.6:8080/categorias/${item.value}/servicos')
            .then(response => {
                setServicosCategorias(prev => ({
                    ...prev,
                    [item.value]: response.data
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Selecione até 3 categorias:</Text>
            <Dropdown
                style={[styles.dropdown, categoriaFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categorias.map(categoria => ({
                    label: categoria.nomeCategoria,
                    value: categoria.idCategoria
                }))}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!categoriaFocus ? 'Selecione uma categoria' : '...'}
                onFocus={() => setCategoriaFocus(true)}
                onBlur={() => setCategoriaFocus(false)}
                onChange={handleCategoriaChange}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={categoriaFocus ? '#4E40A2' : '#8A8A8A'}
                        name="appstore-o"
                        size={20}
                    />
                )}
            />

            {/* Exibir os serviços das categorias selecionadas */}
            {categoriasSelecionadas.map(categoriaId => (
                <View key={categoriaId} style={styles.servicosContainer}>
                    <Text style={styles.label}>Serviços de {categoriaId}:</Text>
                    {servicosCategorias[categoriaId]?.map(servico => (
                        <Text key={servico.idServico} style={styles.servicoItem}>
                            {servico.nomeServico}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        margin: 16
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray'
    },
    selectedTextStyle: {
        fontSize: 16
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    label: {
        fontSize: 14,
        marginBottom: 8
    },
    servicosContainer: {
        marginTop: 16
    },
    servicoItem: {
        fontSize: 14,
        color: 'black',
        marginVertical: 4
    }
});

export default CategoriaServicoDropdown;
