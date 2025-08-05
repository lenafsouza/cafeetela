/* MUDAR ESSE AQUI

import { useState } from 'react';
import { Alert } from 'react-native';

export interface Filme {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

const API_KEY = '42fac7050440e931ae0563fb02956040';
const BASE_URL = 'https://api.themoviedb.org/3';

export const useBuscaFilme = () => {
  const [filme, setFilme] = useState<string>('');
  const [resultados, setResultados] = useState<Filme[]>([]);

  const buscarFilme = async () => {
    if (!filme) {
      Alert.alert('Erro', 'Digite o nome do filme.');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filme}&language=pt-BR`
      );
      const dados = await response.json();

      if (dados.results && dados.results.length > 0) {
        const filmeEncontrado = dados.results[0];
        setResultados((prev) => [...prev, filmeEncontrado]);
        setFilme('');
      } else {
        Alert.alert('Filme não encontrado', 'Nenhum filme encontrado com esse nome.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível buscar o filme. Tente novamente.');
    }
  };

  const removerFilme = (titulo: string) => {
    setResultados((prev) => prev.filter((filme) => filme.title !== titulo));
  };

  return {
    filme,
    setFilme,
    resultados,
    buscarFilme,
    removerFilme,
  };
};
*/

//MUDADO
import { useState } from 'react';
import { Alert } from 'react-native';


export interface Filme {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

const API_KEY = '42fac7050440e931ae0563fb02956040';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function useBuscaFilme() {
  const [filme, setFilme] = useState<string>('');
  const [resultados, setResultados] = useState<Filme[]>([]);

  const buscarFilme = async () => {
    if (!filme) {
      Alert.alert('Erro', 'Digite o nome do filme.');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filme}&language=pt-BR`
      );
      const dados = await response.json();

      if (dados.results && dados.results.length > 0) {
        const filmeEncontrado = dados.results[0];
        setResultados((prev) => [...prev, filmeEncontrado]);
        setFilme('');
      } else {
        Alert.alert('Filme não encontrado', 'Nenhum filme encontrado com esse nome.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível buscar o filme. Tente novamente.');
    }
  };

  const removerFilme = (titulo: string) => {
    setResultados((prev) => prev.filter((filme) => filme.title !== titulo));
  };

  return {
    filme,
    setFilme,
    resultados,
    buscarFilme,
    removerFilme,
  };
}