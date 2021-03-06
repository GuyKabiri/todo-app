import React from 'react'
import '../styles/TodoListStyles.css'
import TodoItem from './TodoItem'
import { Grid, Typography } from '@material-ui/core';

const TodoList = (props) => {

    const { items } = props;

    const screenWidth = window.innerWidth;

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

    return ( items && items.length > 0 ? (
        <Grid container spacing={2} direction='row' justify='center' alignItems='flex-start'>
            { screenWidth <= 600 ? (
            <>
                <Grid container item sm={6} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            renderColuomn(0, 2) 
                    }
                </Grid>
                <Grid container item sm={6} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            renderColuomn(1, 2) 
                    }
                </Grid>
            </>
            ) : (
            <>
                <Grid container item sm={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            renderColuomn(0, 3) 
                    }
                </Grid>
                <Grid container item sm={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            renderColuomn(1, 3) 
                    }
                </Grid>
                <Grid container item sm={4} spacing={2} direction='column' justify='flex-start' alignItems='center'>
                    {    
                            renderColuomn(2, 3) 
                    }
                </Grid>
            </>
            )}
        </Grid>
    )   :   (
        <Grid container direction='row' justify='center' alignItems='center' className='fullheight'>
            <Grid item>
                <Typography variant='h6'>
                    No items to show.
                </Typography>
            </Grid>
        </Grid>
    ))
}

export default TodoList
