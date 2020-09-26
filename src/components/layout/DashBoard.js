import { Grid } from '@material-ui/core';
import React from 'react'
import TodoList from '../TodoList';
import Sidebar from './Sidebar';

const DashBoard = (props) => {
    const {currentUser} = props;
    return (
        <Grid container spacing={3}>
            <Grid item sm={3}>
                <Sidebar currentUser={currentUser} />
            </Grid>
            <Grid item sm={9}>
                <TodoList currentUser={currentUser} />
            </Grid>
        </Grid>
    )
}


export default DashBoard;