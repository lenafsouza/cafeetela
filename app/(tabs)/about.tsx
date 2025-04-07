import { Text, View, StyleSheet} from "react-native";
import {Link} from 'expo-router';

export default function About() {
  return (
    <View style={garro.container}>
      <Text style ={garro.text}>Onde o café encontra a magia do cinema!</Text>
    </View>
  );
}

const garro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ADD8E6',
    justifyContent: 'center',  
    alignItems: 'center',
        

  },
  text: {
    color: '#20B2AA',
    fontSize: 16,
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

});
  