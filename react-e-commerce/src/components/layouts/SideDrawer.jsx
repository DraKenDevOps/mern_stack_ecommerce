import React from 'react'
import { Row } from 'react-bootstrap'

// redux
import { useSelector, useDispatch } from 'react-redux'

// router
import { Link } from 'react-router-dom'

// antD
import { Drawer, Button } from 'antd'

const SideDrawer = () => {
    const dispatch = useDispatch()
    const { cart, drawer } = useSelector((state)=>({...state}))

    const closeDrawer = () => {
        dispatch({
            type: 'SET_VISIBLE',
            payload: false
        })
    }

    return (
        <Drawer title="In your cart" placement="right" visible={drawer} onClose={closeDrawer}>
            {cart?.map((item) => 
                <Row>
                    <div className="col-12">
                        <img src={item.images[0].url} alt={item.title} width="100%"/>
                        <p className="text-center text-light bg-secondary p-2">{item.title}</p>
                    </div>
                </Row>
            )}
            <Link to="/cart">
                <button type="button" className="text-center btn btn-danger fw-bold">Go to Cart</button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer