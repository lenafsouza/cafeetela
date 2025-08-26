import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const generosTMDB: Record<string, number> = {
  Ação: 28,
  Comédia: 35,
  Ficção: 878,
  Terror: 27,
  Animação: 16,
};

const linhasAssentos = ["A", "B", "C", "D", "E", "F"];
const colunasAssentos = 10;

export default function Ingresso() {
  const [generoFilme, setGeneroFilme] = useState<string | null>(null);
  const [filmes, setFilmes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState<any | null>(null);
  const [assentosSelecionados, setAssentosSelecionados] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  const ingressoRef = useRef<View>(null);

  const buscarFilmesPorGenero = async (genero: string) => {
    setLoading(true);
    try {
      const apiKey = "42fac7050440e931ae0563fb02956040";
      const generoId = generosTMDB[genero];
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${generoId}&language=pt-BR&sort_by=popularity.desc&include_adult=false&page=7`;

      const response = await fetch(url);
      const data = await response.json();
      setFilmes((data.results || []).slice(0, 5).filter((filme: any) => filme.poster_path && filme.title));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os filmes.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAssento = (assento: string) => {
    setAssentosSelecionados((prev) =>
      prev.includes(assento) ? prev.filter((a) => a !== assento) : [...prev, assento]
    );
  };

  const limparAssentos = () => {
    setAssentosSelecionados([]);
  };

  const resetarSelecaoComDelay = () => {
    setTimeout(() => {
      setFilmeSelecionado(null);
      setAssentosSelecionados([]);
      setGeneroFilme(null);
      setFilmes([]);
      setHorarioSelecionado(null);
    }, 2000);
  };

  const gerarIngresso = async () => {
    if (!filmeSelecionado) {
      Alert.alert("Atenção", "Selecione um filme primeiro.");
      return;
    }
    if (assentosSelecionados.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um assento.");
      return;
    }
    if (!horarioSelecionado) {
      Alert.alert("Atenção", "Selecione o horário da sessão.");
      return;
    }

    const assentosTexto = assentosSelecionados.join(", ");
    const isWeb = typeof window !== "undefined";

    if (isWeb) {
      const html = `
        <html>
          <head>
            <meta charset="utf-8"/>
            <style>
              body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8f8f8; }
              .ingresso { border: 2px solid #20B2AA; border-radius: 20px; padding: 20px; width: 320px; text-align: center; background: white; }
              .header { background: #20B2AA; color: white; padding: 10px; border-radius: 15px 15px 0 0; }
              img { width: 250px; border-radius: 10px; margin: 15px 0; }
              h2 { color: #20B2AA; }
              .tracejado { margin: 15px 0; color: #aaa; }
              .footer { background: #20B2AA; color: white; padding: 10px; border-radius: 0 0 15px 15px; }
            </style>
          </head>
          <body>
            <div class="ingresso">
              <div class="header"> Café e Tela</div>
              <h2>${filmeSelecionado.title}</h2>
              <img src="https://image.tmdb.org/t/p/w500${filmeSelecionado.poster_path}" />
              <p>📅 ${new Date().toLocaleDateString("pt-BR")}</p>
              <p>⏰ Sessão: ${horarioSelecionado}</p>
              <p>🎟️ Assento(s): ${assentosTexto}</p>
              <div class="tracejado">-------------------------------</div>
              <div class="footer">🍿 Bom Filme!</div>
            </div>
          </body>
        </html>
      `;
      try {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ingresso.html";
        link.click();
       // window.open(url, "_blank");
        resetarSelecaoComDelay();
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar o ingresso.");
      }
    } else {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Habilite o acesso à galeria nas configurações do seu aparelho para salvar o ingresso."
        );
        return;
      }
      try {
        const uri = await captureRef(ingressoRef, { format: "png", quality: 1 });
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert("Sucesso", "Ingresso salvo na galeria!");
        resetarSelecaoComDelay();
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar o ingresso.");
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ADD8E6" }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Filmes em Cartaz</Text>

        <Text style={styles.subtitulo}>Escolha um gênero:</Text>
        <View style={styles.filtrosContainer}>
          {Object.keys(generosTMDB).map((genero) => (
            <TouchableOpacity
              key={genero}
              style={[styles.botaoFiltro, generoFilme === genero && styles.botaoFiltroAtivo]}
              onPress={() => {
                setGeneroFilme(genero);
                buscarFilmesPorGenero(genero);
              }}
            >
              <Text style={generoFilme === genero ? styles.textoFiltroAtivo : styles.textoFiltro}>
                {genero}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && <ActivityIndicator size="large" color="#20B2AA" />}

        {filmes.length > 0 && (
          <FlatList
            data={filmes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardFilme}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                  resizeMode="cover"
                />
                <Text style={styles.nomeFilme}>{item.title}</Text>
                <Text style={styles.dataFilme}>
                  Lançamento: {item.release_date ? new Date(item.release_date).toLocaleDateString("pt-BR") : "Indefinido"}
                </Text>
                <TouchableOpacity style={styles.botaoIngresso} onPress={() => setFilmeSelecionado(item)}>
                  <Text style={styles.textoBotao}>Selecionar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {filmeSelecionado && (
          <>
            <Text style={[styles.subtitulo, { marginTop: 30 }]}>Selecione seus assentos:</Text>
            <View style={styles.assentosContainer}>
              {linhasAssentos.map((linha) => (
                <View key={linha} style={styles.linhaAssentos}>
                  <Text style={styles.letraLinha}>{linha}</Text>
                  {[...Array(colunasAssentos)].map((_, i) => {
                    const assento = linha + (i + 1);
                    const selecionado = assentosSelecionados.includes(assento);
                    return (
                      <TouchableOpacity
                        key={assento}
                        style={[styles.assento, selecionado && styles.assentoSelecionado]}
                        onPress={() => toggleAssento(assento)}
                      >
                        <Text style={selecionado ? styles.assentoTextoSelecionado : styles.assentoTexto}>
                          {i + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.botaoLimpar} onPress={limparAssentos}>
            <Text style={styles.textoBotao}>Limpar Assentos</Text>
            </TouchableOpacity>




            <Text style={[styles.subtitulo, { marginTop: 20 }]}>Escolha o horário da sessão:</Text>
            <View style={styles.horariosContainer}>
              {["14:00", "17:00", "20:00"].map((horario) => (
                <TouchableOpacity
                  key={horario}
                  style={[styles.horarioBotao, horarioSelecionado === horario && styles.horarioBotaoSelecionado]}
                  onPress={() => setHorarioSelecionado(horario)}
                >
                  <Text style={horarioSelecionado === horario ? styles.horarioTextoSelecionado : styles.horarioTexto}>
                    {horario}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ViewShot ref={ingressoRef} style={styles.ingresso}>
              <View style={styles.header}>
                <Text style={styles.cinemaNome}>Café e Tela</Text>
              </View>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${filmeSelecionado.poster_path}` }}
                style={styles.posterIngresso}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.nomeIngresso}>{filmeSelecionado.title}</Text>
                <Text style={styles.dataIngresso}>📅 {new Date().toLocaleDateString("pt-BR")}</Text>
                <Text style={styles.detalhes}>⏰ Sessão: {horarioSelecionado}</Text>
                <Text style={styles.detalhes}>🎟️ Assento(s): {assentosSelecionados.join(", ")}</Text>
              </View>
              <View style={styles.tracejado}>
                <Text style={styles.tracos}>-------------------------------</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerTexto}>🍿 Bom Filme!</Text>
              </View>
            </ViewShot>

            <View style={styles.botoesLinha}>
  <TouchableOpacity style={styles.botaoSalvar} onPress={gerarIngresso}>
    <Text style={styles.textoBotao}>Salvar Ingresso 💾</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.botaoSalvar} onPress={() => {
    setFilmeSelecionado(null);
    setAssentosSelecionados([]);
    setHorarioSelecionado(null);
  }}>
    <Text style={styles.textoBotao}>Editar Ingresso ✏️</Text>
  </TouchableOpacity>
</View>

          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#20B2AA", marginBottom: 20 },
  subtitulo: { fontSize: 18, fontWeight: "600", marginTop: 15, marginBottom: 10, color: "#20B2AA" },
  filtrosContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  botaoFiltro: { backgroundColor: "#fff", borderColor: "#20B2AA", borderWidth: 1, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, margin: 5 },
  botaoFiltroAtivo: { backgroundColor: "#20B2AA" },
  textoFiltro: { color: "#20B2AA" },
  textoFiltroAtivo: { color: "#fff", fontWeight: "bold" },
  cardFilme: { margin: 10, padding: 10, backgroundColor: "#fff", borderRadius: 12, width: 240, alignItems: "center" },
  poster: { width: 200, height: 300, borderRadius: 10 },
  nomeFilme: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#333" },
  dataFilme: { fontSize: 14, color: "#666", marginVertical: 5 },
  botaoIngresso: { backgroundColor: "#20B2AA", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginTop: 10 },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  ingresso: { marginTop: 30, backgroundColor: "#fff", borderRadius: 20, padding: 15, alignItems: "center", width: 320, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 5, overflow: "hidden", borderWidth: 1, borderColor: "#ddd" },
  header: { width: "100%", backgroundColor: "#20B2AA", padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: "center" },
  cinemaNome: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  posterIngresso: { width: 250, height: 350, borderRadius: 10, marginTop: 15 },
  infoContainer: { marginTop: 10, alignItems: "center" },
  nomeIngresso: { fontSize: 18, fontWeight: "bold", color: "#20B2AA", textAlign: "center" },
  dataIngresso: { fontSize: 16, color: "#444", marginVertical: 5 },
  detalhes: { fontSize: 14, color: "#555" },
  tracejado: { marginTop: 15 },
  tracos: { color: "#aaa", letterSpacing: 2 },
  footer: { width: "100%", backgroundColor: "#20B2AA", padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: "center", marginTop: 10 },
  footerTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  botaoSalvar: { backgroundColor: "#20B2AA", padding: 12, borderRadius: 8, marginTop: 20 },
  assentosContainer: { marginTop: 10, width: 320 },
  linhaAssentos: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  letraLinha: { width: 20, fontWeight: "bold", color: "#20B2AA" },
  assento: { width: 24, height: 24, borderRadius: 4, borderWidth: 1, borderColor: "#20B2AA", marginHorizontal: 3, justifyContent: "center", alignItems: "center" },
  assentoSelecionado: { backgroundColor: "#20B2AA" },
  assentoTexto: { color: "#20B2AA", fontWeight: "bold", fontSize: 12 },
  assentoTextoSelecionado: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  horariosContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  horarioBotao: { borderWidth: 1, borderColor: "#20B2AA", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, marginHorizontal: 5, backgroundColor: "#fff" },
  horarioBotaoSelecionado: { backgroundColor: "#20B2AA" },
  horarioTexto: { color: "#20B2AA", fontWeight: "bold" },
  horarioTextoSelecionado: { color: "#fff", fontWeight: "bold" },
  botaoLimpar: {
  backgroundColor: "#20B2AA",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 15,
},

botoesLinha: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 320,
  gap: 10,
},


});
