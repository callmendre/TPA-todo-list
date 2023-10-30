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
      <h1 className="mt-5 align-items-center">Aplikasi TodoList</h1>
      <form>
        <div className="container mt-3 d-flex">
          <input
            type="text"
            className="p-1 form-control flex justify-center"
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
