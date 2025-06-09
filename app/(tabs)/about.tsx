import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function About() {
  return (
    <View style={garro.container}>
      <Text style={garro.text}>
        Onde o café encontra a magia do cinema...
        {"\n\n"}
        Somos um espaço onde o sabor do café e a emoção do cinema se encontram. 
        Unimos o aconchego da cafeteria com a experiência única das telonas, criando um ambiente 
        feito para relaxar, conversar e se inspirar.
      </Text>
    </View>
  );
}

const garro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#20B2AA',
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1.5,            // largura da borda
    borderColor: '#20B2AA',      // cor da borda
    borderRadius: 10,            // cantos arredondados
    padding: 15,                 // espaço interno
    backgroundColor: '#ffffff90' // leve fundo branco translúcido 
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
