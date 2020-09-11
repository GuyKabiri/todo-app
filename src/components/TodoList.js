import React, { Component } from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { title: 't1', id: '1', checked: false},
                { title: 't2', id: '2', checked: true},
                { title: 't3', id: '3', checked: false},
                { title: 't4', id: '4', checked: false},
                { title: 't5', id: '5', checked: false},
                { title: 't6', id: '6', checked: false},
            ],
        }

        this.toggleChecked.bind(this);
    }

    toggleChecked = (e) => {
        let thisId = e.target.name;
        let newItem = this.state.items.find( (item) => item.id === thisId);
        newItem.checked = !newItem.checked;
        this.setState( (prevState) => ({
            items: [...prevState.items.map( (item) => item.id === thisId ? newItem : item)]
        }))
    }

    render() {
        return (
            <div className='row'>
                <div className='col s4'>
                {
                    this.state.items ?
                    this.state.items.map( (item) => (
                        <TodoItem item={item} toggle={this.toggleChecked} key={item.id} /> ))
                        : null
                }
                </div>
            </div>
        )
    }
}

export default TodoList
