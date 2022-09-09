import React,{useState, useEffect} from 'react'
import MenubarUser from '../../layouts/MenubarUser'
import { Row, Accordion } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrder } from '../../services/users'
import moment from 'moment/min/moment-with-locales'
import Invoice from './Invoice'

const OrderHistory = () => {
    const { user } = useSelector((state) => ({...state}))
    const dispacth = useDispatch()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadOrderHistory(user.token)
    },[])

    const loadOrderHistory = (accesstoken) => {
        getUserOrder(accesstoken).then((res) => {
            setOrders(res.data)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    return (
        <Row>
            <div className="col-md-2 pe-lg-0 pe-md-0">
                <MenubarUser/>
            </div>
            <div className="col-md-8 pe-lg-0 my-3">
                
                <Accordion defaultActiveKey="0" flush>
                    {orders.map((item, idx) =>
                        <Accordion.Item eventKey={item._id}>
                            <Accordion.Header>
                                <h5 className="text-primary my-0">{moment(item.createdAt).locale('lo').format('DD/MM/YYYY, LTS')}</h5>
                                <h6 className="my-0 ms-auto me-0">{item.status}</h6>
                            </Accordion.Header>
                            <Accordion.Body>
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
                                            <tr>
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
                                    </tbody>
                                </table>
                                <Row>
                                    <div className="col">
                                        <Invoice order={item}/>
                                    </div>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>
            </div>
        </Row>
    )
}

export default OrderHistory