import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, View, Alert, StyleSheet, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type Filme = {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
};

export default function App() {
  const [filme, setFilme] = useState('');
  const [resultados, setResultados] = useState<Filme[]>([]); 

  const API_KEY = '42fac7050440e931ae0563fb02956040'; 
  const BASE_URL = 'https://api.themoviedb.org/3';

  async function buscarFilme() {
    if (!filme) {
      Alert.alert('Erro', 'Digite o nome do filme.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filme}&language=pt-BR`);
      const dados = await response.json();

      if (dados.results && dados.results.length > 0) {
        const filmeEncontrado = dados.results[0]; 
        setResultados(prev => [...prev, filmeEncontrado]); 
        setFilme(''); 
        Keyboard.dismiss();
      } else {
        Alert.alert('Filme não encontrado', 'Nenhum filme encontrado com esse nome.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível buscar o filme. Tente novamente.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte seu Filme</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textinput}
          placeholder="Digite o nome do filme..."
          value={filme}
          onChangeText={setFilme}
        />
        <TouchableOpacity onPress={buscarFilme} style={styles.botao}>
          <AntDesign name="staro" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.result}>
            <Text>🎬 Nome: {item.title}</Text>
            <Text>🎭 Gênero (ID): {item.genre_ids?.[0] ?? 'Indefinido'}</Text>
            <Text>📅 Lançamento: {item.release_date ?? 'Data não disponível'}</Text>
            <Text>📝 Sinopse: {item.overview?.length > 0 ? item.overview : 'Sinopse indisponível'}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#20B2AA',
    textAlign: 'center',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  textinput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color: '#FFFFE0',
    fontWeight: 'bold',
  },
  
  botao: {
    backgroundColor: '#20B2AA',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  result: {
    marginBottom: 10,
    alignItems: 'flex-start',
    width: '100%',
    padding: 15,
    backgroundColor: '#A1C6E8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
