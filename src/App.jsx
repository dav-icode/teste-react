import { useEffect, useState } from "react";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import Title from "./components/Title";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // --------------------------------------

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return () => {};
  }, [tasks]);

  // --------------------------------------

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //* Preciso atualizar esta tarefa
      if (task.id === taskId) {
        return { ...task, iscompleted: !task.iscompleted };
      }
      //* Não preciso atualizar esta tarefa
      return task;
    });
    setTasks(newTasks);
  }

  // --------------------------------------

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    console.log("Tarefa deletada:", taskId);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      iscompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  // --------------------------------------

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
