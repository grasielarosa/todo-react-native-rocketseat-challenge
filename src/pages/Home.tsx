import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // const newCounter = tasks.filter((item) => item.done === false).length;

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const findTask = tasks.find((x) => x.title === newTaskTitle);
    findTask
      ? Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
          [
            {
              text: "Ok",
            },
          ]
        )
      : setTasks((tasks) => [...tasks, newTask]);
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const find = updatedTasks.find((item) => item.id === id);
    if (!find) {
      return;
    }

    find.done = !find.done;

    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    const newList = tasks.filter((item) => item.id !== id);
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => setTasks(newList),
        },
        {
          text: "Não",
        },
      ]
    );

    //TODO - remove task from state
  }
  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const find = updatedTasks.find((item) => item.id === taskId);
    if (!find) {
      return;
    }
    find.title = taskNewTitle;
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
