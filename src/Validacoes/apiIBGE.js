import axios from 'axios';

const API_IBGE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

export const buscarEstados = async () => {
  try {
    const response = await axios.get(`${API_IBGE_URL}/estados`);
    const estados = response.data.map((estado) => ({
      label: estado.nome, 
      value: estado.sigla, 
    }));
    return estados;
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    throw error;
  }
};

export const buscarCidades = async (siglaEstado) => {
  try {
    const response = await axios.get(`${API_IBGE_URL}/estados/${siglaEstado}/municipios`);
    const cidades = response.data.map((cidade) => ({
      label: cidade.nome, 
      value: cidade.nome, 
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
      value: cidade.nome, 
    }));
    return cidades;
  } catch (error) {
    console.error('Erro ao buscar todas as cidades:', error);
    throw error;
  }
};
export const buscarEnderecoPorCep = async (cep, setEndereco, setBairro, setEstadoValue, setCidadeValue, estados) => {
  if (cep.length === 8) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setEndereco(data.logradouro || '');
        setBairro(data.bairro || '');

        const estadoEncontrado = estados.find((estado) => estado.value === data.uf);
        if (estadoEncontrado) {
          setEstadoValue(estadoEncontrado.value); 
          setCidadeValue(data.localidade); 
        } else {
          alert('Estado não encontrado para a sigla: ' + data.uf);
          limparCampos(setEndereco, setBairro, setEstadoValue, setCidadeValue);
        }
      } else {
        alert('CEP inválido!');
        limparCampos(setEndereco, setBairro, setEstadoValue, setCidadeValue);
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error.message);
      alert('Erro ao buscar o CEP.');
      limparCampos(setEndereco, setBairro, setEstadoValue, setCidadeValue);
    }
  }
};


export const limparCampos = (setEndereco, setBairro, setEstadoValue, setCidadeValue) => {
  setEndereco('');
  setBairro('');
  setEstadoValue('');
  setCidadeValue('');
};
