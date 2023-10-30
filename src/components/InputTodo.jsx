import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducers/todo-reducer";

function InputTodo() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div>
      <center>
        <h1>Aplikasi TodoList</h1>
      </center>
      <form>
        <div className="container mt-3 d-flex">
          <input
            type="text"
            className="p-1 form-control"
            placeholder="input todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary ml-2" onClick={handleClick}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputTodo;
