import axios from 'axios';

const API_CATEGORIAS_URL = 'http://192.168.0.7:8080/categorias'; 

export const buscarCategorias = async () => {
  try {
    const response = await axios.get(API_CATEGORIAS_URL);
    const categorias = response.data.map((categoria) => ({
      label: categoria.nomeCategoria,
      value: categoria.idCategoria, 
    }));
    return categorias; 
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};
