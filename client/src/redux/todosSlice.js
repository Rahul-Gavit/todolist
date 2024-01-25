import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    setTodo: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    },
  },
});

export const { setTodo, addTodo, deleteTodo, completeTodo } = todoSlice.actions;

// Async actions using Redux Thunk
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}api/v1/todo-list`);
    dispatch(setTodo(response.data.allTasks));
  } catch (error) {
    console.log(error);
  }
};

export const addTodoAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}api/v1/todo-list/`, data);
    dispatch(addTodo(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}api/v1/todo-list/${id}`);
    dispatch(deleteTodo(id));
  } catch (error) {
    console.log(error);
  }
};

export const completeTodoAsync = (id) => async (dispatch) => {
  try {
    await axios.put(`${apiUrl}api/v1/todo-list/${id}`, {
      completed: true,
    });
    dispatch(completeTodo(id));
  } catch (error) {
    console.log(error);
  }
};

export default todoSlice.reducer;
