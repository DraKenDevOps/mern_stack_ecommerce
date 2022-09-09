import React from 'react'

// router
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'

const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search } = useSelector((state) => ({...state}))

    const { text } = search

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {
                text: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/shop')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
                <input type="search" className='form-control' placeholder="Search..." onChange={handleChange}/>
                <button type="submit" className='ms-1 btn btn-danger'>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default Search