import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { Row } from 'react-bootstrap'
import FileUpload from './FileUpload'
// service
import { readProduct, updateProduct } from '../../../services/products'
import { categoriesList } from '../../../services/categories'

// redux
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const initialState = {
    title:"",
    desc:"",
    price:"",
    stock_qty:"",
    images: [],
    category:""
}

const antIcon = (
    <LoadingOutlined
      style={{
        color: "red",
        fontSize: 24
      }}
      spin
    />
);

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    const {user} = useSelector((state) => ({...state}))

    const [products, setProducts] = useState(initialState)
    const [loading, setLoading] = useState(false)
    // dropdown category
    const [cate, setCate] = useState([])

    const handleChange = (e) => {
        setProducts({...products,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        loadCategory(user.token)
        loadProduct(user.token, params.id)
    },[])

    const loadCategory = (accesstoken) => {
        categoriesList(accesstoken).then(res => {
            setCate(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    const loadProduct = (accesstoken, id) => {
        readProduct(accesstoken,id).then(res => {
            setProducts({...products, ...res.data})
        }).catch(err => {
            console.log(err.response)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(user.token, params.id, products).then(res => {
            navigate("/admin/home")
            toast.success(res.data.message,{
                theme: "dark"
            })
        }).catch(err => {
            toast.error(err.response.message,{
                theme: "dark"
            })
        })
    }

    return (
        <>
            <Row>
            <div className="col-md-2 pe-lg-0 pe-md-0">
                    <MenubarAdmin/>
                </div>
                <div className="col-md-10 pe-lg-0">
                    <div className="card border-danger">
                        <div className="card-header border-bottom-0">
                            <Link to={"/admin/home"} className='btn btn-danger fw-bold float-end'>Products</Link>
                        </div>
                        <div className="card-body">
                            { loading ? <Spin indicator={antIcon} /> : <h2 className="card-title text-danger fw-bold my-1">Update Product</h2>}
                            <form onSubmit={handleSubmit}>
                                <Row>
                                    <div className="col-md-6 pe-lg-0">
                                        <Row className="mt-3">
                                            <div className="col-md-6 mb-3">
                                                <input type="text" name="title" className="form-control" placeholder="Title" value={products.title} onChange={handleChange}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="number" name="price" className="form-control" placeholder="Price" value={products.price} onChange={handleChange}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="number" name="stock_qty" className="form-control" placeholder="Stock Quantity" value={products.stock_qty} onChange={handleChange}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <select className="form-select" name="category" value={products.category._id} onChange={handleChange}>
                                                    <option>Category</option>
                                                    {cate.length > 0 && cate.map(item => 
                                                        <option value={item._id}>{item.name}, {item.name_en}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <textarea className="form-control" name="desc" rows="7" placeholder="Description" value={products.desc} onChange={handleChange}></textarea>
                                            </div>
                                            
                                            <div className="col-md-6 mb-3">
                                                <button type="submit" className="btn btn-outline-dark text-danger fw-bold border-1 w-100" onChange={handleSubmit}>
                                                    UPDATE
                                                </button>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <button type="reset" className="btn btn-outline-dark text-warning fw-bold border-1 w-100">
                                                    RESET
                                                </button>
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <FileUpload loading={loading} setLoading={setLoading} products={products} setProducts={setProducts}/>
                                    </div>
                                </Row>
                            </form>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}

export default UpdateProduct