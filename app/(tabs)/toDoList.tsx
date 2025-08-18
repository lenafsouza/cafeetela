import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useTarefas from '../hooks/useTarefas'; // TIREI AS CHAVES {}
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ToDoList() {
  const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();
  const [isSearching, setIsSearching] = React.useState(false);

  const handleTextChange = (text: string) => {
    setNovaTarefa(text);
    setIsSearching(text.length > 0); // Detecta se o campo de texto está vazio ou não
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>✨ Lista de Tarefas ✨</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isSearching && styles.inputSearching]} // Modifica o estilo quando começa a digitar
            placeholder="Adicione uma tarefa..."
            value={novaTarefa}
            onChangeText={handleTextChange}
          />

          <TouchableOpacity onPress={adicionarTarefa}>
            <Ionicons name="checkmark-done" size={30} color="#20B2AA" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarefaContainer}>
              <Text style={styles.tarefaTexto}>{item.texto}</Text>
              <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                <Ionicons name="close-circle-outline" size={25} color="#20B2AA" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6', // Cor de fundo suave
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#20B2AA',
    shadowColor: '#A1C6E8',
    shadowRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1.5,            // Largura da borda
    borderColor: '#20B2AA',      // Cor da borda
    padding: 15,                 // Tamanho fixo do espaço interno
    fontSize: 16,                // Tamanho da fonte
    borderRadius: 10,            // Bordas arredondadas
    marginRight: 10,
    backgroundColor: '#ffffff90', // Fundo suave com transparência
    color: '#20B2AA',            // Cor do texto
    fontWeight: 'bold',          // Peso da fonte
  },
  inputSearching: {
    backgroundColor: '#ffffff60', // Altere o fundo quando estiver pesquisando (mais escuro)
    borderColor: '#20B2AA',       // Mudando a borda de acordo com a pesquisa
  },
  tarefaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fffafa',    // Fundo suave para as tarefas
    padding: 15,
    marginBottom: 5,
    borderRadius: 10,              // Bordas arredondadas para tarefas
    borderWidth: 1.5,              // Borda suave
    borderColor: '#20B2AA',        // Cor da borda
    shadowColor: '#000',           // Sombra leve
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,                  // Sombra no Android
  },
  tarefaTexto: {
    fontSize: 16,
    color: '#20B2AA',              // Cor do texto da tarefa
  },
  remover: {
    fontSize: 18,
  },
});
