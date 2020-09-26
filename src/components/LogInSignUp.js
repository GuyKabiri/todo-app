import { Grid } from '@material-ui/core'
import React from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

export default function LogInSignUp() {
    return (
        <Grid container direction='row' justify='space-around' alignItems='flex-start' spacing={1}>
            <Grid item xs={5}>
                <LogIn />
            </Grid>
            <Grid item xs={5}>
                <SignUp />
            </Grid>
        </Grid>
    )
}
