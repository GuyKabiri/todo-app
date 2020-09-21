import React, { Component } from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'
import { auth, firestore } from '../services/firebase'
import { Redirect } from 'react-router-dom';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            items: [],
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

    componentDidMount() {
        if (this.state.currentUser) {
            firestore.collection('todos').where('uid', '==', this.state.currentUser.id)
            .onSnapshot( (snapshot) => {
                var arr = []
                snapshot.forEach( doc => {
                    arr.push({ id: doc.id,
                                ...doc.data() });
                });
                this.setState({
                    items: [...arr],
                })
            })
        }
    }

    render() {
        return (
            this.state.currentUser ? (
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
        )   :   (
            <Redirect to='/login' />
        ))
    }
}

export default TodoList
