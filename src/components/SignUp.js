import React, { Component } from 'react'
import { auth, createUserProfileDocument } from '../services/firebase'
import '../styles/SignUpStyles.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
            err: '',
            [e.target.id]: e.target.value
        })
    }    

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, firstName, lastName } = this.state;
        if (password !== confirmPassword) {
            this.setState({
                err: 'Passwords are not match!',
            })
            return;
        }
        else if (!email || !password || !confirmPassword || !firstName || !lastName) {
            this.setState({
                err: 'All fields required!',
            })
            return;
        }
        
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { firstName, lastName });
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                err:'',
            })
        } catch(err) {
            const { code, message } = err;
            this.setState({ err: message })
        }

    }

    render() {
        return (
        <div className='container signup-form'>
            <form className='white' onSubmit={this.handleSubmit}>
                <h5 className='grey-text text-darken-3'>Sign Up</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' onChange={this.handleChange} />                    
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' onChange={this.handleChange} />                    
                    </div>
                    <div className='input-field col s6'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' onChange={this.handleChange} />                    
                    </div>
                </div>
                <div className='input-field'>
                    <button className='btn blue darken-2 z-depth-2'>Sign Up</button>
                    <span className="helper-text right red-text">{ this.state.err }</span>
                </div>
            </form>                
        </div>
        )
    }
}
