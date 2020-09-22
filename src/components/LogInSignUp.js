import React from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

export default function LogInSignUp() {
    return (
        <div className='row'>
            <div className='col s6'>
                <LogIn />
            </div>
            <div className='col s6'>
                <SignUp />
            </div>            
        </div>
    )
}
