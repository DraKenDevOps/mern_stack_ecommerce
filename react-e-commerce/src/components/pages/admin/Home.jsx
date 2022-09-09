import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { Row, Table } from 'react-bootstrap'

import AdminProductCard from './card/AdminProductCard'

// antd
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { productList, deleteProduct } from '../../services/products'

// redux
import { useSelector } from 'react-redux'

// time
import moment from 'moment/min/moment-with-locales'

// router
import { Link } from 'react-router-dom'

// notify
import { toast } from 'react-toastify'

const Home = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({...state}))

  useEffect(() => {
    loadProduct(user.token, 5)
  },[])

  const loadProduct = async(count) => {
    setLoading(true)

    productList(count).then(res => {

      setLoading(false)
      console.log(res)
      setProduct(res.data)

    }).catch(err => {

      setLoading(false)
      console.log(err.response.message)
      toast.error('Can not load data, Because', err.response.message,{
        theme: "dark"
      })

    })
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this')){
      deleteProduct(user.token, id).then(res => {
        toast.success(res.data.message,{
          theme: "dark"
        })
        loadProduct(user.token, 5)
      }).catch(err => {
        toast.error('Can not delete data, Because', err.response.message,{
          theme: "dark"
        })
      })
    }
  }

  return (

      <Row>
        <div className="col-md-2 pe-lg-0 pe-md-0">
          <MenubarAdmin/>
        </div>
        <div className="col-md-10 pe-lg-0">
          <div className="card border-danger">
            <div className="card-body">
              {loading ? <h2 className="card-title text-danger fw-bold">Loading...</h2> : <h2 className="card-title text-danger fw-bold">Product</h2>}
              
              <select className="form-select">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>

              <div className="table-responsive">
                <Table hover variant="dark">
                  <thead className="text-danger">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((item, index) => (
                      <tr>
                        <td>{index + 1}.</td>
                        <td>{item.title}</td>
                        <td>{item.price.toLocaleString()}.00 LAK</td>
                        <td>{item.stock_qty}</td>
                        <td>{item.category.name} | {item.category.name_en}</td>
                        <td>
                          {moment(item.createdAt).locale('lo').format('DD/MM/YYYY, LTS')}
                        </td>
                        <td>
                          {moment(item.updatedAt).locale('lo').format('DD/MM/YYYY, LTS')}
                        </td>
                        <td>
                          <button type="button" className="btn btn-sm btn-warning pt-0 pb-2 pe-2 me-2">
                            <Link className="text-dark" to={`/admin/product/update/${item._id}`}>
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

          <hr />

          <Row>
            {product.map((item) => (
              <div className='col-lg-3 col-md-4 col-sm-4 pe-0'>
                <AdminProductCard product={item} handleDelete={handleDelete}/>
              </div>
            ))}
          </Row>

        </div>
      </Row>

  )
}

export default Home