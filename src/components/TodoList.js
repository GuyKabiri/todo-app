import React from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'
import { Grid } from '@material-ui/core';

const TodoList = (props) => {

    const { items } = props;

    const renderColuomn = (startIndex, factor) => {
        let arr = []
        for (let i = startIndex; i < items.length; i += factor) {
            arr.push(items[i]);
        }
        return arr.map( (item) => (
            <Grid item key={item.id} className='item'>
                <TodoItem item={item} toggle={props.toggleChecked} deleteAction={props.deleteAction} />
            </Grid>
        ))
    }

    return ( items ? (
        <Grid container spacing={2} direction='row' justify='center' alignItems='flex-start'>
            <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                {    
                        renderColuomn(0, 3) 
                }
            </Grid>
            <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                {    
                        renderColuomn(1, 3) 
                }
            </Grid>
            <Grid container item xs={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                {    
                        renderColuomn(2, 3) 
                }
            </Grid>
        </Grid>
    )   :   (
        null
    ))
}

export default TodoList
