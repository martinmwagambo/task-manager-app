import React, { Component } from "react";

class TaskList extends Component {
  // Render method for the TaskList component
  render() {
    // Destructuring props to get required values
    const { tasks, onDelete, onToggleComplete, onProgress } = this.props;

    // Return the JSX representing the list of tasks
    return (
      // Task list rendered as an unordered list with Tailwind CSS classes
      <ul className="list-disc mt-4">
        {tasks.map((task) => (
          // Individual task item with dynamic styling based on completion status
          <li
            key={task.id}
            // Dynamic class based on task completion status
            className={`flex items-center justify-between p-2 border-b ${
              task.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {/* Task name displayed */}
            <span>{task.name}</span>
            <div>
              {/* Button to toggle task progress between "To Do" and "In Progress" */}
              <button
                onClick={() => onProgress(task.id)}
                className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                {task.progress === "In Progress" ? "In Progress" : "To Do"}
              </button>

              {/* Button to toggle task completion status between "Complete" and "Undo" */}
              <button
                onClick={() => onToggleComplete(task.id)}
                className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              {/* Button to delete the task */}
              <button
                onClick={() => onDelete(task.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default TaskList;
