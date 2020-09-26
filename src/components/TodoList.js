import React, { Component } from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'
import { firestore } from '../services/firebase'
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            items: [],
        }

        this.toggleChecked.bind(this);
        this.deleteAction.bind(this);
    }

    toggleChecked = (e) => {
        let thisId = e.target.name;
        let newItem = this.state.items.find( (item) => item.id === thisId);
        newItem.checked = !newItem.checked;
        this.setState( (prevState) => ({
            items: [...prevState.items.map( (item) => item.id === thisId ? newItem : item)]
        }))

        try {
            firestore.collection('todos').doc(thisId).update({
                checked: newItem.checked,
            })
        }
        catch (e) {
            console.log(e.message)
        }
    }

    deleteAction = (id) => {
        try {
            firestore.collection('todos').doc(id).delete()
            .then( () =>  this.setState((prevState) => ({
                    items: [...prevState.items.filter( (item) => item.id !== id)]
                }))
            )
        }
        catch (e) {
            console.log(e.message)
        }
    }

    componentDidMount() {
        if (this.state.currentUser) {
            firestore.collection('todos')
            .where('uid', '==', this.state.currentUser.id).get()
            .then( (snapshot) => {
                var arr = []
                snapshot.forEach( doc => {
                    arr.push({ id: doc.id,
                                ...doc.data() });
                });
                arr.sort( (a, b) => b.createdAt.toDate() - a.createdAt.toDate());
                this.setState({
                    items: [...arr],
                })
            })
        }
    }

    renderColuomn = (startIndex) => {
        let arr = []
        const {items} = this.state;
        for (let i = startIndex; i < items.length; i += 3) {
            arr.push(items[i]);
        }
        return arr.map( (item) => (
            <Grid item key={item.id} className='item'>
                <TodoItem item={item} toggle={this.toggleChecked} deleteAction={this.deleteAction} />
            </Grid>
        ))
    }

    render() {
        return (
            this.state.currentUser && this.state.items ? (
            <Grid container spacing={2} direction='row' justify='center' alignItems='flex-start'>
                <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            this.renderColuomn(0) 
                    }
                </Grid>
                <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            this.renderColuomn(1) 
                    }
                </Grid>
                <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            this.renderColuomn(2) 
                    }
                </Grid>
            </Grid>
        )   :   (
            <Redirect to='/login' />
        ))
    }
}

export default TodoList
