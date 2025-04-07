import {View, StyleSheet} from "react-native";
import {Link, Stack} from 'expo-router';

export default function NotFoundScreen(){
    return(
        <>
            <Stack.Screen options = {{title: 'Ops! Nao encontrado'}}/>
            <View style = {garro.container}>
            <Link href= "/" style={garro.button}>
            Voltar para a tela inicial!!
            </Link>
            </View>
        </>
    );  
}

const garro = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ADD8E6', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#20B2AA',
      },



})