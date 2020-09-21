import React from 'react'
import { NavLink } from 'react-router-dom'
// import { logOutFunc } from '../../services/Auth'
import { auth } from '../../services/firebase'

const SignedInLinks = (props) => {
    const { currentUser } = props;
    return (
        <ul className='right'>
            <li>
                <NavLink to='/login' onClick={() => auth.signOut() }>
                    Log Out
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/'
                    className='btn btn-floating blue darken-2'>
                        { currentUser.firstName[0] + currentUser.lastName[0] }
                </NavLink>
            </li>
        </ul>
    )
}

export default SignedInLinks
