import React from 'react'
import '../../styles/SignedLinksStyles.css'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/'>Sign Up</NavLink></li>
            <li>
                <NavLink to='/' className='link-with-icon'>
                    <i className="material-icons circle">login</i>
                    Log In
                </NavLink>
            </li>
        </ul>
    )
}

export default SignedOutLinks
