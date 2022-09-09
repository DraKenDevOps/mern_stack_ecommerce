import React from 'react'

// redux
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((state) =>({...state}))
    
    return (
        <div>
            
        </div>
    )
}

export default Profile