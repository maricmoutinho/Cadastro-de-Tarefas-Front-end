import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import {Feather,MaterialCommunityIcons} from "@expo/vector-icons";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editando, setEditando] = useState(null);

  
  const API = "http://192.168.0.106:3000/tarefas";

 
  async function carregarTarefas() {
    try {
      const response = await axios.get(API);
      setTarefas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert("Digite uma tarefa");
      return;
    }

    try {
      if (editando) {
        await axios.put(`${API}/${editando}`, {
          titulo,
        });

        setEditando(null);
      } else {
        await axios.post(API, {
          titulo,
        });
      }

      setTitulo("");
      carregarTarefas();
    } catch (error) {
      console.log(error);
    }
  }

  async function excluir(id) {
    try {
      await axios.delete(`${API}/${id}`);
      carregarTarefas();
    } catch (error) {
      console.log(error);
    }
  }

  function editar(item) {
    setTitulo(item.titulo);
    setEditando(item.id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconTopo}>
  <MaterialCommunityIcons
    name="clipboard-check-outline"
    size={70}
    color="#0459a4"

  />
</View>
      <Text style={styles.titulo}>
        Cadastre suas tarefas para organizar seu dia a dia!
      </Text>

      <View style={styles.inputContainer}>
  <Feather
    name="edit-3"
    size={22}
    color="#0459a4"
  />

  <TextInput
    style={styles.input}
    placeholder="Digite uma tarefa"
    value={titulo}
    onChangeText={setTitulo}
  />
</View>

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >
        <View style={styles.botaoContainer}>
  <Feather
    name={editando ? "refresh-cw" : "plus-circle"}
    size={20}
    color="#fff"
  />

  <Text style={styles.botaoTexto}>
    {editando ? "Atualizar" : "Cadastrar"}
  </Text>
</View>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.tarefaContainer}>
  <MaterialCommunityIcons
    name="clipboard-text-outline"
    size={28}
    color="#0459a4"
  />

  <Text style={styles.nome}>
    {item.titulo}
  </Text>
</View>

            <View style={styles.linha}>
              <TouchableOpacity
                style={styles.editar}
                onPress={() => editar(item)}
              >
                <View style={styles.btnInterno}>
  <Feather
    name="edit-2"
    size={16}
    color="#fff"
  />

  <Text style={styles.textoBotao}>
    Editar
  </Text>
</View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.excluir}
                onPress={() => excluir(item.id)}
              >
               <View style={styles.btnInterno}>
  <Feather
    name="trash-2"
    size={16}
    color="#fff"
  />

  <Text style={styles.textoBotao}>
    Excluir
  </Text>
</View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  paddingTop: 60,
  backgroundColor: "#F4F7FB",
  },

  titulo: {
    fontSize: 32,
  fontWeight: "bold",
  textAlign: "center",
  color: "#0459a4",
  marginBottom: 25,
  },

 input: {
  flex: 1,
  padding: 15,
  fontSize: 16,
},

  botao: {
    backgroundColor: "#1B6EC2",
  padding: 15,
  borderRadius: 30,
  marginBottom: 20,
  elevation: 3,
  },

  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#ffffff",
  borderRadius: 50,
  padding: 20,
  marginBottom: 40,
  elevation: 3,
  shadowColor: "#047ef9",
  shadowOpacity: 30,
  shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  
  },

  nome: {
  fontSize: 18,
  fontWeight: "600",
  marginLeft: 10,
},

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editar: {
    backgroundColor: "#28a745",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 30,
  },

  excluir: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },

  iconTopo: {
  alignItems: "center",
  marginBottom: 10,
},

inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 15,
  borderWidth: 1,
  borderColor: "#ddd",
  paddingHorizontal: 15,
  marginBottom: 15,
},

botaoContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
},

tarefaContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
},

btnInterno: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},
  
});
