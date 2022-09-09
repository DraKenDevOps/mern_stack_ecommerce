import React from 'react'
// antd
import { Card } from 'antd';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

import _ from 'lodash'

// redux
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card; 

const ProductCard = ({product}) => {
    
    const {_id, title, desc, images} = product

    const dispatch = useDispatch()

    const handleAddtoCart = () => {
        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            qty:1
        })

        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem('cart', JSON.stringify(unique))
        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        })

        dispatch({
            type: "SET_VISIBLE",
            payload: true
        })

    }

    return (
        <>
            <Card
                className='p-1'
                hoverable
                style={{ width: "100%" }}
                cover={
                    <img
                        alt={title}
                        src={images && images.length ? images[0].url : ""}
                    />
                }
                actions={[
                    <Link to={``}>
                        <ShoppingCartOutlined style={{ fontSize: 24, color: 'red' }} onClick={handleAddtoCart}/>
                    </Link>,
                    <Link to={`product/detail/${_id}`}>
                        <InfoCircleOutlined style={{ fontSize: 24, color: 'grey' }}/>
                    </Link>
                ]}
                >
                <Meta
                    title={title}
                    description={desc}
                    style={{whiteSpace:"nowrap"}}
                />
            </Card>
        </>
    )
}

export default ProductCard