import React from 'react'
import '../../styles/NavbarStyles.css'
import SignedInLinkes from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { AppBar, IconButton, Toolbar, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = (props) => {
    const { currentUser } = props;

    return ( 

    <AppBar position='sticky'>
        <Toolbar>
        <Grid container direction='row' justify='space-between' alignItems='center'>
            <Grid item xs={4}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" noWrap>
                            Todo
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            { props.currentUser ? 
                (<SignedInLinkes currentUser={currentUser} />)   :
                (<SignedOutLinks />) }
            </Grid>
        </Grid>
        </Toolbar>
    </AppBar>
    )
}

export default Navbar