import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { Row, Table } from 'react-bootstrap'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { createCat, categoriesList, deleteCateg } from '../../../services/categories'

// redux
import { useSelector } from 'react-redux'

// moment
import moment from 'moment/min/moment-with-locales'

// router
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

const CreateCategory = () => {
    // access user data in redux
    const user = useSelector((state) =>({...state}))

    const [values, setValues] = useState({
        name:'',
        name_en:''
    })

    const [categ, setCateg] = useState([])

    const handleCategory = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createCat(user.user.token,values).then(res => {
            toast.success(res.data.message)
            loadData(user.user.token)
        }).catch(err => {
            toast.error(err.response)
        })
    }

    useEffect(() => {
        loadData(user.user.token)
    },[])

    const loadData = (accesstoken) => {
        categoriesList(accesstoken).then(res => {
            setCateg(res.data)
        }).catch(err => {
            toast.error(err.response)
        })
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this')){
            deleteCateg(user.user.token, id).then((res) => {
                toast.success(res.data.message)
                loadData(user.user.token)
            }).catch(err => {
                toast.error(err.response)
            })
        }
    }

    return (
        <>
            <Row>
                <div className="col-md-2 pe-lg-0 pe-md-0">
                    <MenubarAdmin/>
                </div>
                <div className="col p-2">
                    <Row>
                        <div className="col-lg-4 col-md-8 pe-lg-0">
                            <div className="card border-danger">
                                <div className="card-header border-bottom-0">
                                    <h2 className="card-title text-danger fw-bold my-1 text-center">Add Category</h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input type="text" name="name" className="form-control" id="float1" placeholder="name" onChange={handleCategory}/>
                                            <label htmlFor="float1">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" name="name_en" className="form-control" id="float1" placeholder="english name" onChange={handleCategory}/>
                                            <label htmlFor="float1">English Name</label>
                                        </div>
                                        <button className="btn btn-outline-dark text-danger border-2 fw-bold float-end w-50" type="submit">CREATE</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="mt-md-3 mt-md-3 mt-lg-0  col-lg-8">
                            <div className="card border-danger">
                                <div className="card-body">
                                    <h2 className="card-title text-danger fw-bold">Categories</h2>
                                    <div className="table-responsive">
                                        <Table hover variant="dark">
                                            <thead className="text-danger">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Eng Name</th>
                                                    <th>Created</th>
                                                    <th>Updated</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categ.map((item, index) => (
                                                    <tr>
                                                        <td>{index+1}.</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.name_en}</td>
                                                        <td>
                                                            {moment(item.createdAt).locale('lo').format('DD/MM/YYYY, LTS')}    
                                                        </td>
                                                        <td>
                                                            {moment(item.updatedAt).locale('lo').format('DD/MM/YYYY, LTS')}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-sm btn-warning pt-0 pb-2 pe-2 me-2">
                                                                <Link className="text-dark" to={`/admin/category/update/${item._id}`}>
                                                                    <EditOutlined />
                                                                </Link>
                                                            </button>
                                                            <button type="button" className="btn btn-sm btn-danger pt-0 pb-2 pe-2" onClick={() => handleDelete(item._id)}>
                                                                <DeleteOutlined />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </Row>
        </>
    )
}

export default CreateCategory