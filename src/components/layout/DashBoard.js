import React from 'react'
import { firestore } from '../../services/firebase'
import { Grid } from '@material-ui/core';
import TodoList from '../TodoList';
import Sidebar from './Sidebar';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            items: [],
            search: '',
        }

        this.toggleChecked.bind(this);
        this.deleteAction.bind(this);
        this.handleSearch.bind(this);
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
    
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    renderItem = (text) => {
        return this.state.items.filter( (item) => item.title.includes(text) || item.text.includes(text) )
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item sm={3}>
                    <Sidebar currentUser={this.props.currentUser} search={this.state.search} handleSearch={this.handleSearch} />
                </Grid>
                <Grid item sm={9}>
                    <TodoList items={this.renderItem(this.state.search)} deleteAction={this.deleteAction} toggleChecked={this.toggleChecked} />
                </Grid>
            </Grid>
        )
    }
}


export default DashBoard;