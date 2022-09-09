import React,{useState, useEffect} from 'react'

import { Container, Row } from 'react-bootstrap'

import ProductDetailCard from './ProductDetailCard'

// service
import { readProduct } from '../services/products'

import { useParams } from 'react-router-dom'

// router
import { Link } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams()
    const [detail, setDetail] = useState([])

    useEffect(() => {
        loadDetail()
    },[])

    const loadDetail = () => {
        readProduct(params.id).then(res => {
            setDetail(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    return (
        <Container className='my-5'>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to={"/"} className="text-danger fw-bold text-decoration-none">
                            Home
                        </Link>
                    </li>
                    <li class="breadcrumb-item active">
                        <Link to={"/shop"} className="text-danger fw-bold text-decoration-none">
                            Shop
                        </Link>
                    </li>
                </ol>
            </nav>
            
            <Row>
                <ProductDetailCard detail={detail}/>
            </Row>
            <Row>
                
            </Row>
        </Container>
    )
}

export default ProductDetail