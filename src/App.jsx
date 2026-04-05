import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [show, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("todos")
    if (data) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    
  }, [todos])
  
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = async () => {
    let id = uuidv4();
    setTodos([...todos, { id: id, todo, isComplete: false }]);
    setTodo("");
  };
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  };
  const handleEdit = (id) => {
    let t = todos.filter((e) => e.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((e) => e.id !== id);
    setTodos(newTodos);
  };
  const handleDelete = (id) => {
    let newTodos = todos.filter((e) => e.id !== id);
    setTodos(newTodos);
  };
  const toggleShow = () => {
    setShowCompleted(!show);
  };

  return (
    <>
      <Navbar />
      <div className="main w-1/2 rounded-lg mx-auto mt-5 bg-emerald-100 flex flex-col items-center p-4">
        <h1 className="font-bold text-lg text-yellow-600">
          <span className="line-through text-[22px]">S</span>Task - Get Your
          Tasks Done
        </h1>
        <div className="w-full flex gap-4">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="bg-white w-full rounded-lg"
          />
          <button
            onClick={handleClick}
            disabled={todo.length < 4}
            className="bg-emerald-800 text-white p-1 px-3 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="tasks w-full flex flex-col gap-3 py-9 items-start">
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="show"
              id="show"
              checked={show}
              onChange={toggleShow}
            />
            <p>Show Completed Tasks</p>
          </div>
          {todos.length === 0 && show === true && (
            <div className="1">No Tasks to Show</div>
          )}
          {todos.filter((e) => e.isComplete === false).length === 0 &&
            show === false && <div className="2">No Tasks to Show</div>}
          {todos.map((item) => {
            return (
              (show || !item.isComplete) && (
                <div className="todos w-full" key={item.id}>
                  <div className="todo flex w-full justify-between">
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        name={item.id}
                        id=""
                        onChange={handleCheck}
                        checked={item.isComplete}
                      />
                      <p className={item.isComplete ? "line-through" : ""}>
                        {item.todo}
                      </p>
                    </div>
                    <div className="buttons flex gap-4">
                      <button
                        className="bg-emerald-800 text-white p-1 px-3 rounded-lg"
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-emerald-800 text-white p-1 px-3 rounded-lg"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
