import React from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'

const TodoList = () => {
    return (
        <div className='row'>
            <TodoItem item={null} />
            <TodoItem item={null} />
            <TodoItem item={null} />
            <TodoItem item={null} />
            <TodoItem item={null} />
           
        </div>
    )
}

export default TodoList
