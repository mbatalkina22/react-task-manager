import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilter = (state: RootState) => state.tasks.filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }
);
