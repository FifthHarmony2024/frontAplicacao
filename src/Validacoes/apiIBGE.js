import axios from 'axios';

const API_IBGE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

export const buscarEstados = async () => {
  try {
    const response = await axios.get(`${API_IBGE_URL}/estados`);
    const estados = response.data.map((estado) => ({
      label: estado.nome,
      value: estado.id,
    }));
    return estados; 
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    throw error;
  }
};

export const buscarCidades = async (idEstado) => {
  try {
    const response = await axios.get(`${API_IBGE_URL}/estados/${idEstado}/municipios`);
    const cidades = response.data.map((cidade) => ({
      label: cidade.nome,
      value: cidade.id,
    }));
    return cidades; 
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
  }
};

export const buscarTodasCidades = async () => {
  try {
    const response = await axios.get(`${API_IBGE_URL}/municipios`);
    const cidades = response.data.map((cidade) => ({
      label: cidade.nome,
      value: cidade.id,
    }));
    return cidades;
  } catch (error) {
    console.error('Erro ao buscar todas as cidades:', error);
    throw error;
  }
};
