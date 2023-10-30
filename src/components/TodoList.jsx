import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "../redux/reducers/todo-reducer";

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [editedTodo, setEditedTodo] = useState({ id: null, value: "" });
  const [checkedTodos, setCheckedTodos] = useState({});
  const [filter, setFilter] = useState("all"); // State untuk filter

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
    updatedCheckedTodos[id] = !checkedTodos[id];
    setCheckedTodos(updatedCheckedTodos);

    // Memperbarui status menggunakan aksi Redux
    dispatch(updateTodoStatus(id, updatedCheckedTodos[id]));
  };

  const handleFilter = (status) => {
    setFilter(status);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && !todo.status) {
      return false; // Filter active, tetapi tidak aktif
    }
    if (filter === "deactive" && todo.status) {
      return false; // Filter deactive, tetapi aktif
    }
    return true; // Item memenuhi kriteria filter
  });

  function updateTodoStatus(id, status) {
    return {
      type: "UPDATE_TODO_STATUS",
      payload: { id, status },
    };
  }

  return (
    <div>
      <button onClick={() => handleFilter("all")}>Show All</button>
      <button onClick={() => handleFilter("active")}>Active</button>
      <button onClick={() => handleFilter("deactive")}>Deactive</button>

      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          <span onClick={() => handleToggleStatus(todo.id)}>
            <input
              type="checkbox"
              checked={checkedTodos[todo.id] || todo.status} // Tambahkan || false
              onChange={() => handleToggleStatus(todo.id)}
            />

            {todo.id === editedTodo.id ? (
              <input
                type="text"
                value={editedTodo.value || ""} // Tambahkan || ""
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
