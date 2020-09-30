import React from 'react'
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'
import { auth } from '../../services/firebase'

const SignedInLinks = (props) => {
    const { currentUser } = props;

    const signOut = () => {
        auth.signOut();
    }

    return (
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item>
                <Button onClick={ () => signOut() } className='link-with-icon'>
                    Log Out
                </Button>
            </Grid>
            <Grid item>
                <IconButton to='/' component={RouterLink}>
                    <Avatar color='secondary'>
                        <Typography>
                        { currentUser.firstName[0] + currentUser.lastName[0] }
                        </Typography>
                    </Avatar>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default SignedInLinks
