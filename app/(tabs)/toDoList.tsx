import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import  useTarefas  from '../hooks/useTarefas';//TIREI AS CHAVES {}
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-gesture-handler'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ToDoList() {
  const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <View style={styles.container}>
        <Text style={styles.titulo}>✨ Lista de Tarefas ✨</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma tarefa..."
            value={novaTarefa}
            onChangeText={setNovaTarefa}
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
  container: { flex: 1, padding: 20, backgroundColor: '#ADD8E6' },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#20B2AA',
    //textShadowColor: '#A1C6E8',
    //textShadowRadius: 6,
    shadowColor: '#A1C6E8',
    shadowRadius: 6,
  },
  inputContainer: { flexDirection: 'row', marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color: '#FFFFE0',
    fontWeight: 'bold',
  },
  tarefaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fffafa',
    padding: 15,
    marginBottom: 5,
    borderRadius: 5,
   shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    //boxShadow: '0px 2px 3px rgba(0,0,0,0.1)', - substitui shadowColor + shadowRadius + elevation
  },
  tarefaTexto: { fontSize: 16, color: '#20B2AA' },
  remover: { fontSize: 18 },
});

