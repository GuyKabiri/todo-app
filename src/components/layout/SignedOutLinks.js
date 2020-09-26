import React from 'react'
import '../../styles/SignedLinksStyles.css'
import { Link as RouterLink } from 'react-router-dom'
import { Fingerprint } from '@material-ui/icons';
import { Button, Link } from '@material-ui/core';

const SignedOutLinks = () => {
    return (
        <div>
            <Button startIcon={<Fingerprint className='link-with-icon' />}>
                <Link to='/auth' className='link-with-icon' component={RouterLink} underline='none'>
                    Log In / Sign Up
                </Link>
            </Button>
        </div>
    )
}

export default SignedOutLinks
