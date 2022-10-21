import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])

  const todoNameRef = useRef()

  //Saving Todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //Adding Todos
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  //Toggling Todos FOR REACT DO NOT CHANGE STATE DIRECTLY
  function toggleTodo(id){
    const newTodos = [...todos] // CREATE NEW COPY
    const todo = newTodos.find(todo => todo.id === id) // FIND TODO BY ID FROM COPY
    todo.complete = !todo.complete // CHANGE VALUE
    setTodos(newTodos) // SET COPY AS NEW LIST
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
