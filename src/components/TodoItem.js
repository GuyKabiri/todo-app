import React from 'react'
import '../styles/TodoItemStyles.css'

const TodoItem = (props) => {

    const {title, text, id, checked} = props.item;
    const onToggle = props.toggle

    return (
    <div>
    <div className='card blue-grey darken-1 z-depth-2'>
        <div className="card-content white-text">
        <span className={`card-title ${ checked ? 'checked' : null }`}>
            Card Title { title }
            <div className='right'>
                <label>
                    <input type="checkbox" name={id} onChange={onToggle} defaultChecked={checked} />
                    <span></span>
                </label>
            </div>
        </span>
            <p className={ checked ? 'checked' : null}>
            { text }{ text }{ text }{ text }
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
