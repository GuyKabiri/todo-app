import React, { Component } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { auth } from '../services/firebase'
import '../styles/LogInStyles.css'

export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            err: '',
        }

        this.handleChange.bind(this.handleChange);
        this.handleSubmit.bind(this.handleSubmit);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            err: '',
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        if (!email || !password) {
            this.setState({
                err: 'All fields required!'
            });
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email,password);

        } catch ({ message }) {
            this.setState({ err: message })
        }
    }

    render() {
        return (
        <Grid container className='login-form'>
            <Grid item xs={12}>
            <form className='white' onSubmit={this.handleSubmit}>
                <Typography variant='h5'>
                    Log In
                </Typography>
                <TextField id='email'
                            label="Email"
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='email'
                             />

                <TextField id='password'
                            label="Password"
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='password'
                             />

                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
                    <Grid item>
                        <Button variant='outlined' onClick={this.handleSubmit}>Log In</Button>
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
