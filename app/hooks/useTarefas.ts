
/*
import {useState} from 'react'; //nativo do react

interface Tarefa {
    id: string,
    texto: string;
}

export function useTarefas(){
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState<string> ('');

    const adicionarTarefa = () => {
        if (novaTarefa.trim()=== '') return;
        setTarefas([...tarefas, {id: Date.now().toString(), texto: novaTarefa}]);
        setNovaTarefa('');
    };

    const removerTarefa = (id: string) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    };

    return {tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa};
}
    */

//MUDADO

import {useState} from 'react';

interface Tarefa {
  id: string,
  texto: string;
}

export default function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<string>('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;
    setTarefas([...tarefas, {id: Date.now().toString(), texto: novaTarefa}]);
    setNovaTarefa('');
  };

  const removerTarefa = (id: string) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  return {tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa};
}