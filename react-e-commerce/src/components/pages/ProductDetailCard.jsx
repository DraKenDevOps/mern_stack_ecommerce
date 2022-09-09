import React from 'react'

// antd
import { Card, Tabs } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'

// react-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { toast } from 'react-toastify'

import { Link } from 'react-router-dom'

import _ from 'lodash'

// redux
import { useSelector, useDispatch } from 'react-redux';

// service
import { addWishList,getWishList,removeWishList } from '../services/users'

const { TabPane } = Tabs;

const ProductDetailCard = ({detail}) => {
  const { _id, title, desc, images, price, stock_qty, sold, category } = detail

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({...state}))

  const handleAddtoCart = () => {
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.push({
      ...detail,
      qty: 1
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

  const addToWishList = (e) => {
    if(user){
      addWishList(user.token, _id).then((res) => {
        console.log(res.data)
        toast.success(res.data.message,{
          theme:'dark'
        })
      }).catch((err) => {
        console.log(err.response)
      })
    } else {
      toast.error("Please Log In")
    }
  }

  return (
    <>
      <div className="col-md-6">
        <Carousel autoPlay showArrows={true}>
          {
            images && images.map(img => 
              <img
                style={{ width: "100%" }}
                alt={title}
                src={img.url}
              />
            )
          }
        </Carousel>
      </div>
      <div className="col-md-6">
        
        <Card
          className='p-1'
          actions={[
            <button type='button' className="btn btn-outline-secondary fw-bold w-75" onClick={handleAddtoCart}> 
              <ShoppingCartOutlined style={{ fontSize: 24 }}/>
              <br />
              Add to Cart
            </button>,
            <button type='button' className="btn btn-outline-danger fw-bold w-75" onClick={addToWishList}> 
              <HeartOutlined style={{ fontSize: 24 }}/>
              <br />
              Add to Wishlist
            </button>
          ]}
        >
          <h3 className='text-danger fw-bold'>{title}</h3>
          <h5 className='text-muted'>Price: {price}.00 LAK</h5>
          <h5 className='text-muted'>Left Quantity: {stock_qty}</h5>
          <h5 className='text-muted'>Sold: {sold}</h5>
          <h5 className='text-muted'>Category: {category?.name_en}</h5>
        </Card>
      </div>
      <div className="col-md-12">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Product Description" key="1">
            <p className='mt-3 text-muted'>{desc}</p>
          </TabPane>
          <TabPane tab="More..." key="2">
            More...
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default ProductDetailCard