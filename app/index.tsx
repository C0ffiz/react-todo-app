import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  function carregarTarefas() {
    AsyncStorage.getItem('tasks')
      .then(tarefasSalvas => {
        if (tarefasSalvas) {
          setTasks(JSON.parse(tarefasSalvas));
        }
      });
  }

  React.useEffect(() => {
    carregarTarefas();
  }, []);

  function adicionarTarefa() {
    if (task === '') return;

    const novaTarefa = {
      id: Date.now(),
      text: task
    };

    const novaListaDeTarefas = tasks.concat([novaTarefa]);
    setTasks(novaListaDeTarefas);
    setTask('');

    AsyncStorage.setItem('tasks', JSON.stringify(novaListaDeTarefas));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma tarefa"
            value={task}
            onChangeText={text => setTask(text)}
            placeholderTextColor="#555"
          />

          <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.text}</Text>
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
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#29292e',
    borderRadius: 5,
    color: '#f1f1f1',
    padding: 16,
    fontSize: 16,
    marginRight: 12,
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
  taskText: {
    color: '#f1f1f1',
    fontSize: 16,
  },
});