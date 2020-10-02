import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { auth, createUserProfileDocument } from '../services/firebase'
import '../styles/SignUpStyles.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signup_email: '',
            signup_password: '',
            confirmPassword: '',
            firstName:'',
            lastName:'',
            err:'',
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
        const { signup_email, signup_password, confirmPassword, firstName, lastName } = this.state;
        if (signup_password !== confirmPassword) {
            this.setState({
                err: 'Passwords are not match!',
            })
            return;
        }
        else if (!signup_email || !signup_password || !confirmPassword || !firstName || !lastName) {
            this.setState({
                err: 'All fields required!',
            })
            return;
        }
        
        try {
            const { user } = await auth.createUserWithEmailAndPassword(signup_email, signup_password);
            await createUserProfileDocument(user, { firstName, lastName });
                        
        } catch({ message }) {
            this.setState({ err: message })
        }

    }

    render() {
        return (
            <Grid container className='signup-form'>
            <Grid item xs={12}>
            <form className='white' onSubmit={this.handleSubmit}>
                <Typography variant='h5'>
                    Sign Up
                </Typography>
                <TextField id='signup_email'
                            label="Email"
                            value={this.state.signup_email} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='email'
                             />
                    
                <TextField id='signup_password'
                            label="Password"
                            value={this.state.signup_password} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='password'
                             />
                
                <TextField id='confirmPassword'
                            label="Confirm Password"
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth
                            margin='dense'
                            type='password'
                             />

                <Grid container spacing={1}>
                    <Grid item sm>
                        <TextField id='firstName'
                                    label="First Name"
                                    value={this.state.firstName} 
                                    onChange={this.handleChange} 
                                    fullWidth
                                    margin='dense'
                                    type='text'
                                    />
                    </Grid>

                    <Grid item sm>
                        <TextField id='lastName'
                                    label="Last Name"
                                    value={this.state.lastName} 
                                    onChange={this.handleChange} 
                                    fullWidth
                                    margin='dense'
                                    type='text'
                                    />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
                    <Grid item>
                        <Button variant='outlined' onClick={this.handleSubmit}>Sign Up</Button>
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
