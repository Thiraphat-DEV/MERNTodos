import Axios from "axios";
//API backend
const URLAPI = "http://localhost:5000/todos";
//show TodoList
export const readTodos = () => Axios.get(URLAPI);
//create TodoList follow url and send NewTodo
export const createTodos = (newTodo) => Axios.post(URL, newTodo);
//updateTodo follow id  with fetchTodo 1 more
export const updateTodos = (id, updateTodo) => {
  Axios.patch(`${URL}/${id}`, updateTodo);
};

//delete todo for id , no Config newTodo
export const deleteTodos = (id) => {
	Axios.delete(`${URL}/${id}`)
};
