import React from 'react'
import '../../styles/SignedLinksStyles.css'
import { Link } from 'react-router-dom'

const Sidebar = ({currentUser}) => {
    return (
    <div className="collection sidebar">
        <Link to='/' className='collection-item'>Folder 1</Link>
        <Link to='/' className='collection-item active'>Folder 2</Link>
        <Link to='/' className='collection-item'>Folder 3</Link>
        <Link to='/' className='collection-item'>Folder 4</Link>
        <Link to='/' className="collection-item">
            <div>
                Create New Folder
                <i className='material-icons secondary-content'>create_new_folder</i>
            </div>
        </Link>
    </div>
    
    )
}

export default Sidebar
