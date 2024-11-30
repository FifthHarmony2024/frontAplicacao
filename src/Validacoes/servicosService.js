import API_CONFIG_URL from '.././Validacoes/ipConfig';

export const buscarServicosPorCategoria = async (idCategoria) => {
  try {
    const response = await fetch(`${API_CONFIG_URL}servicos/categoria/${idCategoria}`);
    console.log('Response:', response);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar serviços');
    }

    const data = await response.json(); 
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    throw error;
  }
};
