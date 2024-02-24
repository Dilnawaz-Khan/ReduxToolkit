import {configureStore} from '@reduxjs/toolkit';

import counterSlice from '../slices/counterSlices';
import todoSlice from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todo: todoSlice,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
