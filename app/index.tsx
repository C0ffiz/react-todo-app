import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [tarefa, setTarefa] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [tarefas, setTarefas] = React.useState([]);
  const [idEdicao, setIdEdicao] = React.useState(null);
  const [textoEdicao, setTextoEdicao] = React.useState('');
  const [descricaoEdicao, setDescricaoEdicao] = React.useState('');
  const [erro, setErro] = React.useState('');

  function carregarTarefas() {
    AsyncStorage.getItem('tasks')
      .then(tarefasSalvas => {
        if (tarefasSalvas) {
          setTarefas(JSON.parse(tarefasSalvas));
        }
      });
  }

  React.useEffect(() => {
    carregarTarefas();
  }, []);

  function adicionarTarefa() {
    setErro('');

    if (tarefa.trim() === '') {
      setErro('Por favor, digite um título para a tarefa');
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: tarefa,
      descricao: descricao,
      concluida: false
    };

    const novaListaDeTarefas = tarefas.concat([novaTarefa]);
    setTarefas(novaListaDeTarefas);
    setTarefa('');
    setDescricao('');

    AsyncStorage.setItem('tasks', JSON.stringify(novaListaDeTarefas));
  }

  function toggleTarefa(id) {
    const novaListaDeTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });

    setTarefas(novaListaDeTarefas);
    AsyncStorage.setItem('tasks', JSON.stringify(novaListaDeTarefas));
  }

  function deletarTarefa(id) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  function editarTarefa(tarefa) {
    setIdEdicao(tarefa.id);
    setTextoEdicao(tarefa.texto);
    setDescricaoEdicao(tarefa.descricao);
  }

  function salvarEdicao() {
    setTarefas(tarefas.map(t => 
      t.id === idEdicao 
        ? {...t, texto: textoEdicao, descricao: descricaoEdicao}
        : t
    ));
    setIdEdicao(null);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, erro ? styles.inputError : null]}
              placeholder="Adicione uma tarefa"
              value={tarefa}
              onChangeText={texto => setTarefa(texto)}
              placeholderTextColor="#555"
            />
            {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Adicione uma descrição"
              value={descricao}
              onChangeText={texto => setDescricao(texto)}
              placeholderTextColor="#555"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          data={tarefas}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.taskContainer, item.concluida && styles.taskCompleted]}>
              {idEdicao === item.id ? (
                <View>
                  <TextInput
                    style={styles.editInput}
                    value={textoEdicao}
                    onChangeText={setTextoEdicao}
                  />
                  <TextInput
                    style={styles.editInput}
                    value={descricaoEdicao}
                    onChangeText={setDescricaoEdicao}
                  />
                  <TouchableOpacity onPress={salvarEdicao}>
                    <Text style={styles.saveButton}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.taskRow}>
                  <View style={styles.taskContent}>
                    <TouchableOpacity onPress={() => toggleTarefa(item.id)}>
                      <Text style={[styles.taskText, item.concluida && styles.textCompleted]}>
                        {item.texto}
                      </Text>
                      {item.descricao && (
                        <Text style={[styles.descriptionText, item.concluida && styles.textCompleted]}>
                          {item.descricao}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => editarTarefa(item)}>
                      <View style={styles.iconButton}>
                        <MaterialIcons name="edit" size={16} color="#fff" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
                      <View style={styles.iconButton}>
                        <MaterialIcons name="delete" size={16} color="#ff4444" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121214',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#f1f1f1',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  form: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 32,
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
  },
  input: {
    height: 56,
    backgroundColor: '#29292e',
    borderRadius: 5,
    color: '#f1f1f1',
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#31cf67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  list: {
    marginTop: 32,
  },
  taskContainer: {
    backgroundColor: '#29292e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    marginRight: 8,
  },
  taskText: {
    color: '#f1f1f1',
    fontSize: 16,
  },
  descriptionText: {
    color: '#a1a1a1',
    fontSize: 14,
    marginTop: 4,
  },
  taskCompleted: {
    backgroundColor: '#1c1c1e',
    opacity: 0.7,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3e',
    borderRadius: 16,
    marginLeft: 8,
  },
  editInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  saveButton: {
    color: '#31cf67',
    textAlign: 'center',
    padding: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
    marginLeft: 4,
  },
});