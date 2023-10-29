import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "../redux/reducers/todo-reducer";

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [editedTodo, setEditedTodo] = useState({ id: null, value: "" });
  const [checkedTodos, setCheckedTodos] = useState({});

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = () => {
    if (editedTodo.id !== null) {
      dispatch(editTodo(editedTodo.id, editedTodo.value));
      setEditedTodo({ id: null, value: "" });
    }
  };

  const handleToggleStatus = (id) => {
    const updatedCheckedTodos = { ...checkedTodos };
    updatedCheckedTodos[id] = !updatedCheckedTodos[id];
    setCheckedTodos(updatedCheckedTodos);
  };
  // ...

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span
            onClick={() => handleToggleStatus(todo.id)}
            className={checkedTodos[todo.id] ? "line-through" : ""}
          >
            <input
              type="checkbox"
              checked={checkedTodos[todo.id]}
              onChange={() => handleToggleStatus(todo.id)}
            />
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
            <button onClick={handleEdit}>Simpan</button>
          ) : (
            <button
              onClick={() => setEditedTodo({ id: todo.id, value: todo.value })}
            >
              ✏️
            </button>
          )}

          <button onClick={() => handleDelete(todo.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
