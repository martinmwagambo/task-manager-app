import React, { Component } from "react";
import TaskList from "./components/Tasklist";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTask: "",
    };
  }

  handleAddTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: new Date().getTime(),
        name: newTask,
        completed: false,
        progress: "",
      };
      this.setState({
        tasks: [...tasks, newTaskObj],
        newTask: "",
      });
      window.alert("Task added successfully in the Task Manager");
    }
  };

  handleToggleTask = (taskId, toggleType) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: toggleType === "complete" ? !task.completed : task.completed,
              progress: toggleType === "progress" ? (task.progress === "" ? "In Progress" : "") : task.progress,
            }
          : task
      ),
    }));
  };

  handleEditTask = (taskId, newName) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      ),
    }));
  };

  handleDeleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* New Task Form */}
        <div className="mb-4">
          <label className="block mb-2">New Task:</label>
          <div className="flex">
            <input
              type="text"
              value={newTask}
              onChange={(e) => this.setState({ newTask: e.target.value })}
              className="flex-grow border p-2 mr-2"
            />
            <button
              onClick={this.handleAddTask}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <ul className="list-disc">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => this.handleToggleTask(task.id, "complete")}
                  className="mr-2"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {task.name}
                </span>
              </div>
              <div>
                <button
                  onClick={() => this.handleToggleTask(task.id, "progress")}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  {task.progress === "In Progress" ? "In Progress" : "To Do"}
                </button>
                <button
                  onClick={() => this.handleEditTask(task.id, prompt("Enter new task name:"))}
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => this.handleDeleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
