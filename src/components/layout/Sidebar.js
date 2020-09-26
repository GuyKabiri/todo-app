import React from 'react'
import '../../styles/SignedLinksStyles.css'
import { Link as RouteLink } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import { CreateNewFolder } from '@material-ui/icons';

const Sidebar = ({currentUser}) => {
    return (
    <Paper elevation={3}>
        <List component="nav" aria-label="main mailbox folders">
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
