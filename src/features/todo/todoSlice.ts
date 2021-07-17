import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { Todo } from './todoTypes';

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        text: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      delete state.todos[action.payload];
    },
    editTodoText: (state, action: PayloadAction<[number, string]>) => {
      const [index, text] = action.payload;
      state.todos[index].text = text;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const todo = state.todos[index];
      todo.completed = !todo.completed;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { addTodo, removeTodo, editTodoText, toggleTodo } =
  todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
