import React, { Component } from 'react'
// import { logInFunc } from '../services/auth';
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
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({ email: '', password: '' });
        } catch (err) {
            console.log(err);
        }

        // const { err, user, snapshot } = await logInFunc(e, this.state);
        // if (err) {
        //     this.setState({ err })
        // }
        // else {
        //     this.setState({
        //         email: '',
        //         password: '',
        //         user,
        //         snapshot,
        //     })
        // }
        // // const { email, password } = this.state;
        // // try {
        // //     const { user } = await auth.signInWithEmailAndPassword(email, password);
        // //     this.setState({ email: '', password: '' });
        // //     const snapshot = await firestore.collection('users').doc(user.uid).get();
        // //     //  TODO: change path
        // //     console.log('login', user, snapshot)
        // // } catch(err) {
        // //     this.setState({ err: err.message })
        // // }

    }

    render() {
        return (
        <div className='container login-form'>
            <form className='white' onSubmit={this.handleSubmit}>
                <h5 className='grey-text text-darken-3'>Sign In</h5>
                <div className='input-field'>
                    <label htmlFor='email' className={{active: 'email'}}>Email</label>
                    <input type='email' id='email' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <button className='btn blue darken-2 z-depth-2'>Login</button>
                    <span className="helper-text right red-text">{ this.state.err }</span>
                </div>
            </form>                
        </div>
        )
    }
}
