import { useState, useEffect } from "react";
import { createTodo, deleteTodo , readTodo, updateTodo} from "../../function/index";
import Loading from "../Loading/Loading";
const Form = () => {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [curId, setCurId] = useState(0);

  const submitTodo = async (e) => {
    e.preventDefault();
    if (curId === 0) {
      const result = await createTodo(todo);
      setTodos([...todo, result]);
      clearField();
    } else {
      await updateTodo(curId, todo);
      clearField();
    }
  };

  const deleteTodoList = async(id) => {
    await deleteTodo(id)

    // get todoFake with check request from user for delete todo
    const checkTodoDelete = [...todos]
    // request id is equal database id
    checkTodoDelete.filter(todo => todo._id !== id)
    setTodos(checkTodoDelete)
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodo();
      console.log(result);
    };
    fetchData();
  }, [curId]);
  useEffect(() => {
    let curTodo =
      curId !== 0
        ? todos.find((todo) => todo._id === curId)
        : { title: "", content: "" };
    setTodo(curTodo);
  }, [curId, todos]);

  const clearField = () => {
    setCurId(0);
    setTodo({ title: "", content: "" });
  };

  useEffect(() => {
    const clear = (e) => {
      if (e.keyCode === 27) clearField();
    };
    //emit event
    window.addEventListener("keydown", clear);
    //clean up event
    return () => window.removeEventListener("keydown", clear);
  }, []);
  return (
    <div className="row">
      <form className="col s12" onSubmit={submitTodo}>
        <pre>{JSON.stringify(todo)}</pre>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">create_new_folder</i>
            <input
              id="title"
              type="text"
              value={todo.title}
              className="validate"
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <label htmlFor="title">Todo</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">closed_captioncreat</i>
            <input
              id="description"
              type="tel"
              className="validate"
              value={todo.content}
              onChange={(e) => setTodo({ ...todo, content: e.target.value })}
            />
            <label htmlFor="description">Summary</label>
          </div>
        </div>
        <div className="row right-align">
          <button className="waves-effect waves-light">Submit</button>
        </div>
      </form>
      {!todos ? (
        <Loading />
      ) : todos.length > 0 ? (
        <div className="collection">
          {todos.map((todo) => (
            <li
              className="collection-item"
              onClick={() => setCurId(todo._id)}
              key={todo.id}
            >
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.content}</p>
                <a href="#!" className="secondary-content" onClick={() => deleteTodoList(todo._id)}>
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </li>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Form;
