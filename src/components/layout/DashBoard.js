import React from 'react'
import TodoList from '../TodoList';
import Sidebar from './Sidebar';

const DashBoard = (props) => {
    const {currentUser} = props;
    return (
        <div className='row '>
            <div className='col s3'>
                <Sidebar currentUser={currentUser} />
            </div>
            <div className='col s9'>
                <TodoList currentUser={currentUser} />
            </div>
        </div>
    )
}


export default DashBoard;