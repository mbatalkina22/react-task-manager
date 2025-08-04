import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store for use in hooks
export { store as default };
