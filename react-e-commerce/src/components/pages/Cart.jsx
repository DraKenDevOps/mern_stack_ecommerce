import React from 'react'
import { Container, Row } from 'react-bootstrap'

import ProductInCart from './ProductInCart'

// notice
import { toast } from 'react-toastify'

// redux
import { useSelector, useDispatch } from 'react-redux'

// router
import { Link, useNavigate } from 'react-router-dom'

// service
import { userCart } from '../services/users'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart, user } = useSelector((state) => ({...state}))

    const getGrandTotal = () => {
        return cart?.reduce((curVal, nextVal) => {
            return curVal + nextVal.qty * nextVal.price
        },0)
    }

    const handleSaveOrder = () => {
        userCart(user.token, cart).then((res) => {
            console.log(res.data)
            toast.success(res.data.message,{
                theme: 'dark'
            })
            navigate("/user/checkout")
        }).catch(err => {
            console.log(err.response)
        })
    }

    const showCartItem = () => 
    <table className='table table-hovered'>
        <thead>
            <tr>
                <th>Product</th>
                <th>Title</th>
                <th>Price</th>
                <th width={40}>Quantity</th>
                <th className='text-end'>Action</th>
            </tr>
        </thead>
        <tbody>
            {cart?.map((item) => <ProductInCart key={item._id} item={item}/>)}
        </tbody>
    </table>

    return (
        <Container fluid>
            <Row>
                <div className="col-md-8">
                    <h4>Cart / {cart?.length} product</h4>
                    {!cart?.length ? <p>No Product</p> : showCartItem()} 
                </div>
                <div className="col-md-4">
                    <h4 className="text-danger my-2 fw-bold">Summary</h4>
                    <hr />
                    {!cart?.length ? 
                            <div className="alert alert-danger text-center">Your Cart is Empty</div>
                        : (
                            cart?.map((item, idx) => 
                            <p key={idx}>
                                {item.title} x {item.qty} = {item.price * item.qty}
                            </p>
                        )
                    )}
                    <hr />
                    <h4>Total: <b className='text-danger'>{getGrandTotal()}</b> LAK</h4>
                    <hr />
                    { user 
                        ? <button className='btn btn-danger fw-bold float-end w-50' disabled={!cart?.length} onClick={handleSaveOrder}>
                            <i class="fas fa-shopping-bag"></i> Check out
                        </button>
                        : <button className='btn btn-secondary fw-bold'>
                            <Link to="/login" state="/cart" className='text-light text-decoration-none'>Login to Checkout</Link>
                        </button>
                    }
                </div>
            </Row>
        </Container>
    )
}

export default Cart