import axios from 'axios';

const API_FOTO_PERFIL_URL = 'http://192.168.0.7:8080/usuarios';  

export const fotoPerfil = async (idUsuario, file) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    const response = await axios.post(`${API_FOTO_PERFIL_URL}/${idUsuario}/fotoPerfil`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Foto de perfil enviada com sucesso:', response.data);
    return response.data;  
  } catch (error) {
    console.error('Erro ao enviar foto de perfil:', error);
    throw error;
  }
};
