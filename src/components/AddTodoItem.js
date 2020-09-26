import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { firestore } from '../services/firebase';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';

export default class AddTodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            title: '',
            text: '',
            err: '',
            currentUser: props.currentUser,
        }

        this.handleSubmit.bind(this);
        this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.state.id) {
            firestore.collection('todos').doc(this.state.id).get()
            .then(docRef => {
                if (docRef.exists) {
                    const data = docRef.data();
                    this.setState({
                        ...data,
                    })
                }
                else {
                    this.setState({
                        id: '',
                        title: '',
                        text: '',
                        err: '',
                    })
                }
            })
        }
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, text } = this.state;
        const createdAt = new Date();

        if (!title) {
            this.setState({ err: "Title is empty" });
            return;
        }

        try {
            if (this.state.id) {
                await firestore.collection('todos').doc(this.state.id).update({
                    title,
                    text,
                    checked: false,
                    createdAt,
                    uid: this.state.currentUser.id,
                })
                this.setState({ err: 'updated' })
            }
            else {
                await firestore.collection('todos').add({
                    title,
                    text,
                    checked: false,
                    createdAt,
                    uid: this.state.currentUser.id,
                })
                this.setState({
                    title: '',
                    text: '',
                    err: '',
                })
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    render() {
        return (
        <Grid container justify='center' className='create-item-form'>
            <Grid item xs={9}>
            <form className='white' onSubmit={this.handleSubmit}>
                <Typography variant='h5'>
                    Add Todo
                </Typography>
                <TextField id='title'
                            label="Title"
                            value={this.state.title} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='text'
                             />

                <TextField id='text'
                            label="Text"
                            value={this.state.text} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='text'
                            multiline
                            rows={10}
                            variant='outlined'
                             />

                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        { this.state.id ? (
                            <Button
                                variant='outlined'
                                onClick={this.handleSubmit}
                                endIcon={<SaveIcon />}
                                >
                                    Save
                            </Button>
                        ) : (
                            <Button 
                                variant='outlined'
                                onClick={this.handleSubmit}
                                endIcon={<SendIcon />}
                                >
                                    Add
                            </Button>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="error">
                            { this.state.err }
                        </Typography>
                    </Grid>
                </Grid>
            </form>
            </Grid>
        </Grid>
        )
    }
}
