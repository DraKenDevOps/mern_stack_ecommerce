import React,{useState, useEffect} from 'react'
import { Row, Accordion } from 'react-bootstrap'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllOrders, updateOrderStatus } from '../../services/orders'
import moment from 'moment/min/moment-with-locales'

const OrdersManage = () => {
    const { user } = useSelector((state) =>({...state}))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadOrders(user.token)
    },[])

    const loadOrders = (accesstoken) => {
        getAllOrders(accesstoken).then((res) => {
            setOrders(res.data)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const updateStatus = (order_id, status) => {
        updateOrderStatus(user.token, order_id, status).then((res) => {
            toast.success(res.data,{
                theme:'dark'
            })
            loadOrders(user.token)
        }).catch((err) => {
            console.log(err.response)
            toast.error(err.response.data.message,{
                theme:'dark'
            })
        })
    }

    return (
        <Row>
            <div className="col-lg-2 pe-lg-0 pe-md-0">
                <MenubarAdmin />
            </div>
            <div className="col-lg-10 my-3">
                <h3 className='text-danger'>Orders List</h3>
                <Accordion defaultActiveKey="0" flush>
                    {orders.map((item, idx) =>
                        <Accordion.Item eventKey={item._id}>
                            <Accordion.Header>
                                <h5 className="text-primary my-0">{moment(item.createdAt).locale('lo').format('DD/MM/YYYY, LTS')}</h5>
                                <h6 className="my-0 ms-auto me-0">{item.status}</h6>
                            </Accordion.Header>
                            <Accordion.Body>
                                <select className="form-select w-25" value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Cancel">Cancel</option>
                                    <option value="Complete">Complete</option>
                                </select>
                                <div className="table-responsive">
                                    <table className="table table-hovered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width={250}>Product</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.products.map((pro, idx) => 
                                                <tr style={{verticalAlign: "baseline"}}>
                                                    <td>{idx+1}</td>
                                                    <td width={250}>
                                                        <img src={pro.product.images[0].url} alt={pro.product.title} width={'100%'}/>
                                                    </td>
                                                    <td>{pro.product.title}</td>
                                                    <td>{pro.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                    <td>{pro.qty}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={5}>
                                                    <h4 className="my-0">Net Price: {item.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })} LAK</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5}>
                                                    <b>Order By:</b> id:{item.orderBy.user_id}, {item.orderBy.username}, <b>Email:</b> {item.orderBy.email}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5}>
                                                    <b>Address: </b>{item.orderBy.address}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>
            </div>
        </Row>
    )
}

export default OrdersManage