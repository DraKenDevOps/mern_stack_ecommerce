import React, {useState, useEffect} from 'react'
import { Container, Row } from 'react-bootstrap'

import { toast } from 'react-toastify'

// redux
import { useSelector, useDispatch } from 'react-redux'

// service
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../services/users'

// react quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CheckOut = () => {
    const { user } = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

    const [cartList, setCartList] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)

    const [address, setAddress] = useState("")
    const [savedAdr, setSavedAdr] = useState(false)

    useEffect(() => {
        loadCartData(user.token)
    },[])

    const loadCartData = (accesstoken) => {
        getUserCart(accesstoken).then((res) => {
            console.log(res.data)
            setCartList(res.data.products)
            setGrandTotal(res.data.cartTotal)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const handleSaveAddress = () => {
        saveAddress(user.token, address).then((res) => {
            console.log(res.data)
            setAddress("")
            if(res.data.ok){
                toast.success("Address is saved",{
                    theme: 'dark'
                })
                setSavedAdr(true)
            }
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const handleCreateOrder = () => {
        saveOrder(user.token).then((res) => {
            toast.success("Order is saved",{
                theme: 'dark'
            })
            emptyCart(user.token)
            dispatch({
                type: 'ADD_TO_CART',
                payload: []
            })

            if(typeof window !== 'undefined'){
                localStorage.removeItem('cart')
            }
        }).catch((err) => {
            console.log(err.response)
        })
    }
    return (
        <Container fluid>
            <Row className='my-3'>
                <div className="col-md-6">
                    <h4>Address</h4>
                    <hr />
                    <ReactQuill value={address} onChange={setAddress}/>
                    <hr />
                    <button type='button' onClick={handleSaveAddress} className="btn btn-danger fw-bold">Submit</button>
                </div>
                <div className="ps-lg-0 col-md-6">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Product <b>{cartList.length}</b> piece</p>
                    <hr />
                    <p className='fw-bold text-danger'>List of Product in Cart</p>
                    {cartList.map((item, idx) =>
                        <div key={idx}>
                            <p>{item.product.title} x {item.qty} = {item.price * item.qty}</p>
                        </div>
                    )}
                    <hr />
                    <h5>Grand Total: <b>{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b> LAK</h5>
                    <br />
                    <button 
                        type='button' 
                        className="btn btn-danger fw-bold" 
                        disabled={!savedAdr || !cartList.length}
                        onClick={handleCreateOrder}
                    >
                        Check Out
                    </button>
                </div>
            </Row>
        </Container>
    )
}

export default CheckOut