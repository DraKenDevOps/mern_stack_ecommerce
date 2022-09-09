import React, {useState, useEffect} from 'react'

// Route
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        },1000) // decrease every 1sec

        // Redirect
        count === 0 && navigate("/")
        return () => clearInterval(interval)

    }, [count])

    return (
        <div>
            <h1 className="text-danger fw-bold">No Permission, redirect in {count}</h1>
        </div>
    )
}

export default LoadingToRedirect