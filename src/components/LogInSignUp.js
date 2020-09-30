import { Grid } from '@material-ui/core'
import React from 'react'
import { Redirect } from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'

export default function LogInSignUp(props) {
    return (    props.currentUser ? (
        <Redirect to='/' />
        ) : (
        <Grid container direction='row' justify='space-around' alignItems='flex-start' spacing={1}>
            <Grid item xs={5}>
                <LogIn />
            </Grid>
            <Grid item xs={5}>
                <SignUp />
            </Grid>
        </Grid>
        )
    )
}
