import React from 'react'
import '../../styles/SignedLinksStyles.css'
import { Link as RouteLink } from 'react-router-dom'
import { IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from '@material-ui/core'
import { CreateNewFolder } from '@material-ui/icons';
import { Search } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';

const Sidebar = ({ search, handleSearch, reload }) => {
    return (
    <Paper elevation={3}>
        <List className='fullwidth'>
            <ListItem>
                <TextField
                    id='search'
                    label='Search'
                    value={search}
                    onChange={handleSearch} 
                    fullWidth
                    margin='dense'
                    type='text'
                    variant='outlined'
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Search />
                        </InputAdornment>
                    ),
                    }}
                />
                <IconButton onClick={reload}>
                    <ReplayIcon />
                </IconButton>
            </ListItem>
            <ListItem button component={RouteLink} to='/add'>
                <ListItemIcon>
                    <CreateNewFolder />
                </ListItemIcon>
                <ListItemText primary="Add Item" />
            </ListItem>
        </List>
    </Paper>
    )
}

export default Sidebar
