import React from 'react'

import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

const ProductInCart = ({item}) => {
    const dispatch = useDispatch()

    const handleChangeQty = (e) => {
        const qty = e.target.value < 1 ? 1 : e.target.value

        if(qty > item.stock_qty){
            toast.warning(`Max available product: ${item.stock_qty}`,{
                theme: 'dark'
            })
            return
        }

        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id == item._id){
                cart[i].qty = qty
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        })
    }

    const handleRemove = () => {
        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id == item._id){
                cart.splice(i,1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        })
    }

    return (
        <tr style={{ verticalAlign: 'baseline'}}>
            <td width={250}>
                <img src={item.images[0].url} alt={item.title} width="100%"/>
            </td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td width={40}>
                <input type="number" value={item.qty} className='form-control' onChange={handleChangeQty}/>
            </td>
            <td className='text-end'>
                <button type='button' className='btn btn-sm btn-danger' onClick={handleRemove}>
                    <i className="fas fa-times-circle"></i>
                </button>
            </td>
        </tr>
    )
}

export default ProductInCart