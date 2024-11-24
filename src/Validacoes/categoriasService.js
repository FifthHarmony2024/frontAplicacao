import axios from 'axios';

const API_CATEGORIAS_URL = 'http://192.168.0.2:8080/categorias'; 

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
