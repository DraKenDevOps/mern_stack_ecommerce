import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { Row } from 'react-bootstrap'

import { readCategory, updateCategory } from '../../../services/categories'

// router
import { useParams, useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

const UpdateCategory = () => {
    const navigate = useNavigate()
    const params = useParams()

    // access user data in redux
    const user = useSelector((state) =>({...state}))

    const [values, setValues] = useState({
        name:'',
        name_en:''
    })

    const handleCategory = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        loadData(user.user.token, params.id)
    },[])

    const loadData = (accesstoken, id) => {
        readCategory(accesstoken, id).then(res => {
            setValues(res.data)
        }).catch(err => {
            toast.error(err.response)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCategory(user.user.token, params.id, values).then(res => {
            toast.success(res.data.message)
            navigate("/admin/category/create")
        }).catch(err => {
            toast.error(err.response)
        })
    }

    return (
        <>
            <Row>
                <div className="col-md-2 pe-lg-0 pe-md-0">
                    <MenubarAdmin />
                </div>
                <div className="col-lg-4 col-md-8 pe-lg-0">
                    <div className="card border-danger">
                        <div className="card-header border-bottom-0">
                            <h2 className="card-title text-danger fw-bold my-1 text-center">Update Category</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="text" name="name" className="form-control" id="float1" placeholder="name" value={values.name} autoFocus onChange={handleCategory}/>
                                    <label htmlFor="float1">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" name="name_en" className="form-control" id="float1" placeholder="english name" value={values.name_en} onChange={handleCategory}/>
                                    <label htmlFor="float1">English Name</label>
                                </div>
                                <button className="btn btn-outline-dark text-danger border-2 fw-bold float-end w-50" type="submit">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}

export default UpdateCategory