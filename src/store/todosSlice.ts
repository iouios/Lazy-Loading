import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  loading: false,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return (await response.json()) as Todo[];
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos)); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        localStorage.setItem('todos', JSON.stringify(state.todos)); 
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
