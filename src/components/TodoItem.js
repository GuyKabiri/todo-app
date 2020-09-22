import React from 'react'
import '../styles/TodoItemStyles.css'

const TodoItem = (props) => {

    const {id, title, text, checked, createdAt} = props.item;
    const onToggle = props.toggle

    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour:'numeric', 
        minute:'numeric',
        hour12: false, };

    const printedDate = createdAt.toDate().toLocaleDateString('il-HE', options);

    return (
    <div>
    <div className='card blue-grey darken-1 z-depth-2 small'>   //  todo: fix size
        <div className="card-content white-text">
        <span className={`card-title ${ checked ? 'checked' : null }`}>
            { title }
            <div className='right'>
                <label>
                    <input type="checkbox" name={id} onChange={onToggle} defaultChecked={checked} />
                    <span></span>
                </label>
            </div>
        </span>
            <p className={`${ checked ? 'checked' : null } text`}>
            { text }
            </p>
        </div>
        <div className="card-action">
            { printedDate.toString() }
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
