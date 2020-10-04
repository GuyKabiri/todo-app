import React from 'react'
import { firestore } from '../../services/firebase'
import { CircularProgress, Grid } from '@material-ui/core';
import TodoList from '../TodoList';
import Sidebar from './Sidebar';
import '../../styles/DashBoardStyles.css'

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            items: null,
            search: '',
        }

        this.toggleChecked.bind(this);
        this.deleteAction.bind(this);
        this.handleSearch.bind(this);
        this.filterItems.bind(this);
        this.sortByChecked.bind(this);
        this.reloadItems.bind(this);
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
        this.reloadItems();
    }

    reloadItems = () => {
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
                    items: [...this.sortByChecked(arr)],
                })
            })
        }
    }
    
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    sortByChecked = (items) => {
        return [...items.filter( (item) => !item.checked ), ...items.filter( (item) => item.checked )]
    }

    filterItems = (text) => {
        return this.state.items.filter( (item) => item.title.includes(text) || item.text.includes(text) )
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <Sidebar currentUser={this.props.currentUser} handleSearch={this.handleSearch} reload={this.reloadItems} search={this.state.search} />
                </Grid>
                <Grid item xs={12} md={9}>
                    { this.state.items ? (
                        <TodoList items={this.filterItems(this.state.search)} deleteAction={this.deleteAction} toggleChecked={this.toggleChecked} />
                    ) : (
                        <Grid container direction='row' justify='center' alignItems='center' className='fullheight'>
                            <Grid item>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        )
    }
}


export default DashBoard;