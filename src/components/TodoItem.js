import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, Checkbox, Collapse, Grid, Grow, IconButton, Typography } from '@material-ui/core';
import '../styles/TodoItemStyles.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const TodoItem = (props) => {
    const {id, title, text, checked, createdAt} = props.item;
    const onToggle = props.toggle
    const deleteAction = props.deleteAction
    const [show, setShow] = useState(true)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


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

        { text.length > 280 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography>
                    { text }
                </Typography>
            </CardContent>
        </Collapse>
        )}


        <CardActions>
            <Grid container direction='row' justify='space-between' alignItems='center' className='action-section'>
                <Grid item>
                    <Typography variant='caption' className='date'>
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
                    { text.length > 280 && (
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </IconButton>
                    )}
                </Grid>
            </Grid>
        </CardActions>
    </Card>
    </Grow>
    )
}

export default TodoItem
