import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG_URL from './ipConfig';

export const useFetchUserData = () => {
    const [userData, setUserData] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true); 

                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    console.log("Dados armazenados no AsyncStorage:", parsedData);

                    const idUsuario = parsedData.id;
                    const response = await fetch(`${API_CONFIG_URL}usuarios/${idUsuario}/perfilPrestador`);
                    
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar dados do endereço: ${response.status}`);
                    }

                    const addressData = await response.json();
                    console.log("Dados recebidos da API:", addressData);

                    const fullUserData = {
                        ...parsedData,
                        ...addressData,
                    };

                    await AsyncStorage.setItem('userData', JSON.stringify(fullUserData));

                    setUserData(fullUserData);
                    setUserAddress(addressData);
                } else {
                    console.warn("Nenhum dado encontrado no AsyncStorage.");
                }
            } catch (error) {
                console.error("Erro ao recuperar dados do usuário:", error);
            } finally {
                setLoading(false); 
            }
        }

        fetchUserData();
    }, []); 

    return { userData, userAddress, loading };
};
