import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4E40A2',
        position: 'relative', 
    },
    fundoRoxo: {
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
        position: 'relative',
    },
    titulo: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 50, 
        marginTop: 30,
        marginRight:85
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
    },
    campos: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8, 
        height: 49, 
        marginBottom: 10, 
        paddingHorizontal: 15,  
        fontSize: 15, 
        color: '#000000',
        borderWidth: 0,
    },
    camposSenha: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        height: 49, 
        paddingHorizontal: 15,  
        fontSize: 15,
        color: '#000000',
        borderWidth: 0,
    },
    inputSenha: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        height: 49, 
        marginBottom: 10,
    },
    botao: {
        backgroundColor: '#FE914E',
        borderRadius: 10, 
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    botaoTexto: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cadastroTexto: {
        color: '#FFFFFF',
        marginTop: 18,
        textAlign: 'center',
    },
    cadastroLink: {
        color: '#FE914E',
        fontWeight: 'bold',
    },
    seta: {
        position: 'absolute',
        top: 84, 
        left: 20,
    },
    iconeOlho: {
        paddingHorizontal: 10,
        paddingRight: 20,
        justifyContent: 'center',
        height: '100%',
    },
    dropdownContainer: {
        marginBottom: 10,
        position: 'relative',
    },
    dropdown: {
        height: 49, 
        borderColor: '#F5F5F5',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        left: 20,
        top: 15,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 15,
    },
    placeholderStyle: {
        fontSize: 15,
        color: '#282828', 
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
    },
    circleBackground: {
        position: 'absolute',
        width: 350,
        height: 90,
        borderRadius: 150,
        backgroundColor: '#5A4ABA', 
        top: 55,
        left: -40, 
    },
    dataNascimento: {
        justifyContent: 'center',  
    },
    textoDataNascimento: {
        fontSize: 15,             
        color: '#282828',      
        textAlign: 'left',         
    }
    
});

export default styles;
