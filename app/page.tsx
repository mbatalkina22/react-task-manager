'use client';

import { useState, useEffect } from "react";
import { Task } from "../types/task";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [taskInput, setTaskInput] = useState<string>("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: Date.now(), name: taskInput, completed: false };
      setTasks((prev) => [...prev, newTask]);
      setTaskInput("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="bg-gradient-custom min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-raleway my-10">Task Tracker</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="flex gap-2 mb-5"
      >
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="border-none rounded-full shadow-md px-3 py-2 w-96 font-quickSand text-black focus:outline-none hover:scale-105"
          required
        />
        <button
          type="submit"
          className="bg-white border-2 border-transparent text-gradient-mid hover:bg-transparent hover:border-white hover:text-white py-2 px-11 mx-2 shadow-lg rounded-full transition-all duration-500 transform hover:scale-105"
        >
          ADD TASK
        </button>
      </form>

      <div className="flex gap-4 mb-6">
        {["All", "Completed", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as "All" | "Completed" | "Pending")}
            className={`px-6 py-3 font-quickSand relative ${filter === status
                ? "text-white"
                : "text-gradient-custom"
              }`}
          >
            {status}
            {filter === status && (
              <span className="absolute bottom-0 left-0 w-full h-[4px] bg-white" />
            )}
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg flex-1 overflow-y-auto">
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-xl mb-3"
            >
              <div className="flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3"
                />
                <span
                  className={`font-quickSand text-black ${task.completed ? "line-through text-gray-500" : ""} break-words w-full`}
                >
                  {task.name}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="pl-6 text-red-500 transition duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
