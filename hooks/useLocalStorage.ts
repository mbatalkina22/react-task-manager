import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTasks } from '../store/taskSlice';
import { selectTasks } from '../store/selectors';

export const useLocalStorage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch(loadTasks(JSON.parse(savedTasks)));
    }
  }, [dispatch]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);
};
