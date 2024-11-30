import axios from 'axios';
import API_CONFIG_URL from '../Validacoes/ipConfig';

const API_CATEGORIAS_URL = `${API_CONFIG_URL}categorias`; 

export const buscarCategorias = async () => {
  try {
    const response = await axios.get(API_CATEGORIAS_URL);
    console.log('Resposta da API:', response.data); 
    if (Array.isArray(response.data)) {
      const categorias = response.data.map((categoria) => ({
        label: categoria.nomeCategoria,
        value: categoria.idCategoria,
      }));
      return categorias;
    } else {
      throw new Error('A resposta da API não é um array.');
    }
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};
