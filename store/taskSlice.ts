import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: 'All' | 'Completed' | 'Pending';
}

const initialState: TaskState = {
  tasks: [],
  filter: 'All',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        name: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'All' | 'Completed' | 'Pending'>) => {
      state.filter = action.payload;
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, loadTasks } = taskSlice.actions;
export default taskSlice.reducer;
