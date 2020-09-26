import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, Checkbox, Grid, Grow, IconButton, Typography } from '@material-ui/core';
import '../styles/TodoItemStyles.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TodoItem = (props) => {
    const {id, title, text, checked, createdAt} = props.item;
    const onToggle = props.toggle
    const deleteAction = props.deleteAction
    const [show, setShow] = useState(true)

    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour:'numeric', 
        minute:'numeric',
        hour12: false, };

    const printedDate = createdAt.toDate().toLocaleDateString('il-HE', options);

    const handleDelete = (id) => {
        setShow(false);
        deleteAction(id);
    }

    return (
    <Grow in={show}>
    <Card className='card'>
        <CardHeader
            action={
                <Checkbox
                    name={id}
                    checked={checked}
                    onChange={onToggle}
                    color='primary'
              />
            }
            title={ 
                <Typography variant='h6' className={`${ checked ? 'checked' : null } title`}>
                    { title }
                </Typography> }
        />
        <CardContent className='card-content'>
          <Typography variant="body1" className={`${ checked ? 'checked' : null } text`}>
            { text }            
          </Typography>
        </CardContent>
        <CardActions>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <Typography variant='caption' color='secondary'>
                    { printedDate.toString() }
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton component={RouterLink} to={`/add/${id}`}>
                        <EditIcon />
                    </IconButton>
                    <IconButton component={RouterLink} to='/' onClick={(e) => handleDelete(id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </CardActions>
    </Card>
    </Grow>
    )
}

export default TodoItem
