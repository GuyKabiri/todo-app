import React from 'react'
import '../../styles/NavbarStyles.css'
import { Link } from 'react-router-dom'
import SignedInLinkes from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = (props) => {
    const { currentUser } = props;
    return (
    <nav className='navbar blue lighten-2'>
        <div className="nav-wrapper">
            <Link to='#!' className='brand-logo'>Logo</Link>
            <Link to='#' className='sidenav-trigger'>
                <i className="material-icons">menu</i>
            </Link>
            <ul className='right hide-on-med-and-down'>
                { props.currentUser ? 
                (<li><SignedInLinkes currentUser={currentUser} /></li>)   :
                (<li><SignedOutLinks /></li>) }
            </ul>
        </div>
    </nav>

    )
}

export default Navbar