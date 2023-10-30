const initialState = {
  todos: [
    { id: 1, value: "belajar react", status: true },
    { id: 2, value: "belajar redux", status: false },
    { id: 3, value: "belajar makan", status: true },
    { id: 4, value: "belajar main fifa", status: false },
  ],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: Date.now(),
        value: action.payload,
        status: false,
      };

      const cloneTodos = [...state.todos, newTodo];

      return {
        todos: cloneTodos,
      };
    case "DELETE_TODO":
      const filterTodo = state.todos.filter(
        (item) => item.id !== action.payload
      );
      return {
        todos: filterTodo,
      };
    case "EDIT_TODO":
      const editedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            value: action.payload.value,
          };
        }
        return todo;
      });
      return {
        todos: editedTodos,
      };
    default:
      return state;
  }
}

export function addTodo(input) {
  return {
    type: "ADD_TODO",
    payload: input,
  };
}

export function deleteTodo(id) {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
}

export function editTodo(id, value) {
  return {
    type: "EDIT_TODO",
    payload: { id, value },
  };
}

export default todoReducer;
