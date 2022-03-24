import * as api from "../api/Api";

export const readTodo = async () => {
  try {
    const { data } = await api.readTodos();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTodo = async (todo) => {
  try {
    const { data } = await api.createTodos(todo);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const { data } = await api.updateTodos(id, todo);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.deleteTodos(id);
  } catch (error) {
    console.error(error.message);
  }
};
