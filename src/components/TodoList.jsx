import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "../redux/reducers/todo-reducer";

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [editedTodo, setEditedTodo] = useState({ id: null, value: "" });

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = () => {
    if (editedTodo.id !== null) {
      dispatch(editTodo(editedTodo.id, editedTodo.value));
      setEditedTodo({ id: null, value: "" });
    }
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <span
            onClick={() => handleStatus(index)}
            className={todo.status ? "line-through" : ""}
          >
            {todo.id === editedTodo.id ? (
              <input
                type="text"
                value={editedTodo.value}
                onChange={(e) =>
                  setEditedTodo({ id: editedTodo.id, value: e.target.value })
                }
              />
            ) : (
              todo.value
            )}
          </span>
          {todo.id === editedTodo.id ? (
            <button onClick={handleEdit}>Save</button>
          ) : (
            <button
              onClick={() => setEditedTodo({ id: todo.id, value: todo.value })}
            >
              Edit
            </button>
          )}
          <button onClick={() => handleDelete(todo.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
