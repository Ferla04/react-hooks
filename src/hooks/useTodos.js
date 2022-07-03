import { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/toDo-App/todoReducer'

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: 'Recolectar la piedra del Alma',
  //   done: false
  // }
]

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, initialState, init )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ))
  }, [ todos ])
  

  const handleNewTodo = ( todo ) => {

    const action = {
      type: 'AddTodo',
      payload: todo
    }

    dispatch( action )
  }

  const handleDeleteTodo = ( id ) => {
    dispatch({
      type: 'RemoveTodo',
      payload: id
    })
  }

  const onToggleTodo = ( id ) => {
    dispatch({
      type: 'ToggleTodo',
      payload: id
    })
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handleNewTodo,
    handleDeleteTodo,
    onToggleTodo
  }
}
