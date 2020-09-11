import React from 'react'
import '../styles/TodoItemStyles.css'

const TodoItem = (props) => {

    const {title, id, checked} = props.item;
    const onToggle = props.toggle

    const handleToggle = (e) => {

    }

    return (
    <div>
    <div className='card blue-grey darken-1'>
        <div className="card-content white-text">
        <span className={`card-title ${ checked && 'checked' }`}>
            Card Title { title }
            <div className='right'>
                <label>
                    <input type="checkbox" name={id} onChange={onToggle} defaultChecked={checked} />
                    <span></span>
                </label>
            </div>
        </span>
            <p className={ checked && 'checked'}>
                I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.
            </p>
        </div>
        <div className="card-action">
            Here are the actions
        </div>
    </div>

    <div id={`#modal${id}`} className="modal">
        <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>

    </div>
    )
}

export default TodoItem
