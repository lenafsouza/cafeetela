import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { useBuscaFilme } from '../hooks/useBuscaFilme'; //importe o hook
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const { filme, setFilme, resultados, buscarFilme, removerFilme } = useBuscaFilme(); //usando o hook 

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  };

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
            <TouchableOpacity
              onPress={() => removerFilme(item.title)}
              style={styles.remover}
            >
              <Ionicons name="backspace-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text>🎬 Nome: {item.title}</Text>
            <Text>🎭 Gênero (ID): {item.genre_ids?.[0] ?? 'Indefinido'}</Text>
            <Text>📅 Lançamento: {item.release_date ? formatarData(item.release_date) : 'Data de lançamento não informada'}</Text>
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
    //textShadowOffset: { width: 1, height: 1 },
    //textShadowRadius: 4,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  remover: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
});
