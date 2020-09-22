import React, { Component } from 'react'
import { firestore } from '../services/firebase';

export default class AddTodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            err: '',
            currentUser: props.currentUser,
        }

        this.handleSubmit.bind(this);
        this.handleChange.bind(this);
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
        catch (err) {
            console.log(err.message)
        }
    }

    render() {
        return (
            <div className='container create-item-form'>
            <form className='white' onSubmit={this.handleSubmit}>
                <h5 className='grey-text text-darken-3'>Add Todo</h5>
                <div className='input-field'>
                    <label htmlFor='title' className={{active: 'title'}}>Title</label>
                    <input type='text' id='title' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <label htmlFor='text'>Text</label>
                    <input type='text' id='text' onChange={this.handleChange} />                    
                </div>
                <div className='input-field'>
                    <button className='btn blue darken-2 z-depth-2'>Add</button>
                    <span className="helper-text right red-text">{ this.state.err }</span>
                </div>
            </form>                
        </div>
        )
    }
}
