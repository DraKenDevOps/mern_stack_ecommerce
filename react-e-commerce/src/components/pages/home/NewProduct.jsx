import React, {useState, useEffect} from 'react'
import ProductCard from '../admin/card/ProductCard'

import LoadingCard from '../admin/card/LoadingCard'

import { Row } from 'react-bootstrap'

import { productListBy } from '../../services/products'

const NewProduct = () => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])

    useEffect(() => {
        loadProduct()
    },[])

    const loadProduct = () => {
        setLoading(true)
        productListBy("createdAt","desc",4).then(res => {
            setLoading(false)
            setProduct(res.data)
        }).catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }

    return (
        <>
            {
                loading ? <LoadingCard count={4}/> : 
                <Row>
                    {product.map((item, idx) => (
                        <div className="col-lg-3 col-md-4 mb-3">
                            <ProductCard key={idx} product={item}/>
                        </div>
                    ))}
                </Row>
            }
        </>
    )
}

export default NewProduct