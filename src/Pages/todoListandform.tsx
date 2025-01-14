import React, { useEffect, useState, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchTodos, addTodo } from '../store/todosSlice'

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState({
    userId: 1,
    id: 0,
    title: "",
    completed: false,
  });

  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos());
    }
  }, [dispatch, todos]);


  const handleAddTodo = () => {
    if (!newTodo.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const todo = { ...newTodo, id: newId };
    dispatch(addTodo(todo));
    setNewTodo({ ...newTodo, title: "" }); 
  };
  
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      {loading && <p>Loading...</p>}
      <h2>Add Todo</h2>
      <div onKeyDown={handleKeyDown}>
        <input
          type="number"
          placeholder="User ID"
          value={newTodo.userId}
          onChange={(e) =>
            setNewTodo({
              ...newTodo,
              userId: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <select
          value={newTodo.completed.toString()}
          onChange={(e) =>
            setNewTodo({ ...newTodo, completed: e.target.value === "true" })
          }
        >
          <option value="false">Incomplete</option>
          <option value="true">Completed</option>
        </select>
        <button onClick={handleAddTodo}>Add</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            User ID: {todo.userId} <strong>{todo.title}</strong>
            {todo.completed ? "(Completed)" : "(Incomplete)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
