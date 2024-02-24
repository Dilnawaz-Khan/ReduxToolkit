import {createSlice, PayloadAction, nanoid} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  todo: string;
  category: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Todo[];
  categories: string[];
}

const initialState: TodoState = {
  todos: [],
  categories: ['Study', 'Work', 'Rest', 'Outing', 'Sports', 'Other'],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (todo: string, category: string) => {
        return {
          payload: {
            id: nanoid(),
            todo,
            category,
            isCompleted: false,
          },
        };
      },
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const {id, todo, category, isCompleted} = action.payload;
      const existingTodoIndex = state.todos.findIndex(item => item.id === id);
      if (existingTodoIndex !== -1) {
        state.todos[existingTodoIndex] = {id, todo, category, isCompleted};
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
    },
  },
});

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;
