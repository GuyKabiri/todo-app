import React, { Component } from 'react'
import '../styles/SignUpStyles.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }

        this.handleChange.bind(this.handleChange);
        this.handleSubmit.bind(this.handleSubmit);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }    

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
        <div className='container signup-form'>
            <form className='white' onSubmit={this.handleSubmit}>
                <h5 className='grey-text text-darken-3'>Sign In</h5>
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
                <div className='input-field'>
                    <button className='btn blue darken-2 z-depth-2'>Sign Up</button>
                    <span className="helper-text right red-text">Helper text</span>
                </div>
            </form>                
        </div>
        )
    }
}
