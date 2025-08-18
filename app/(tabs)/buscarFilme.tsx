import React, { useState } from 'react'; // Adicionando React e useState
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import useBuscaFilme from '../hooks/useBuscaFilme'; // TIREI AS CHAVES {}
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const { filme, setFilme, resultados, buscarFilme, removerFilme } = useBuscaFilme(); // Usando o hook
  const [isSearching, setIsSearching] = useState(false); // Controle de quando está digitando

  const handleTextChange = (text: string) => {
    setFilme(text);
    setIsSearching(text.length > 0); // Detecta se o texto está vazio ou não
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte seu Filme</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textinput, isSearching && styles.inputSearching]} // Estilo quando estiver pesquisando
          placeholder="Digite o nome do filme..."
          value={filme}
          onChangeText={handleTextChange}
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  textinput: {
    flex: 1,
    borderWidth: 1.5,           // Largura da borda
    borderColor: '#20B2AA',     // Cor da borda
    padding: 15,                // Tamanho fixo do espaço interno
    fontSize: 16,               // Tamanho da fonte
    borderRadius: 10,           // Bordas arredondadas
    marginRight: 10,
    backgroundColor: '#ffffff90', // Fundo translúcido leve
    color: '#20B2AA',           // Cor do texto
    fontWeight: 'bold',         // Peso da fonte
  },
  inputSearching: {
    backgroundColor: '#ffffff60', // Cor de fundo quando estiver em "pesquisa" (mais escuro)
    borderColor: '#20B2AA',       // Borda visível
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
    backgroundColor: '#ffffff', // Fundo branco para os resultados
    borderRadius: 10,          // Bordas arredondadas
    borderWidth: 1.5,          // Borda de 1.5px
    borderColor: '#20B2AA',    // Cor da borda
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
