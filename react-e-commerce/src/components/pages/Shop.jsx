import React,{useState, useEffect} from 'react'

// components
import ProductCard from './admin/card/ProductCard'
// import LoadingCard from './admin/card/LoadingCard'

// service
import { productList, searchProduct } from '../services/products' 
import { categoriesList } from '../services/categories'

// redux
import { useSelector } from 'react-redux'

// bootstrap
import { Container, Row } from 'react-bootstrap'

// antd
import { Slider, Checkbox } from 'antd'


const Shop = () => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const { search } = useSelector((state) => ({...state}))

    const [price, setPrice] = useState([0,0])
    const [ok, setOk] = useState(false) 

    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    const { text } = search

    // load all product
    useEffect(() => {
        loadProduct()
        categoriesList().then(res => setCategory(res.data))
    },[])
    const loadProduct = () => {
        setLoading(true)
        productList(4).then(res => {
            setLoading(false)
            setProducts(res.data)
        }).catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }

    // load filter product
    useEffect(() => {
        const delay = setTimeout(() => {
            filterProduct({query: text})
            if(!text){
                loadProduct()
            }
        },500)

        return () => clearTimeout(delay)
    },[text])
    const filterProduct = (arg) => {
        searchProduct(arg).then(res => {
            setLoading(false)
            setProducts(res.data)
        }).catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }

    useEffect(() => {
        filterProduct({price})
        if(!price.length){
            loadProduct()
        }
    },[ok])
    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        },300)
    }

    const handleCheck = (e) => {
        let incheck = e.target.value
        let instate = [...categorySelect]

        let findCheck = instate.indexOf(incheck)

        if(findCheck === -1){
            instate.push(incheck)
        }else{
            instate.splice(findCheck, 1)
        }

        setCategorySelect(instate)
        filterProduct({category: instate});
        if(instate.length < 1) {
            loadProduct()
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <div className="col-md-2">
                        <p className='text-danger mt-3 mb-1'>Filter</p>
                        <hr />
                        <h4 className="text-danger my-1">Search by Price</h4>
                        <Slider value={price} range max={50000000} onChange={handlePrice}/>
                        <hr />
                        <h4 className="text-danger my-1">Search by Category</h4>
                        {category.map((cat, idx) => (
                            <Checkbox key={idx} value={cat._id} onChange={handleCheck}>
                                {cat.name_en}
                            </Checkbox>
                        ))}
                    </div>
                    <div className="col-md-10 mt-3">
                        
                    {
                        loading ? <h1 className="text-center text-danger fw-bold">Loading....</h1> : 
                        <Row>
                            {products.map((item, idx) => (
                                <div className="col-lg-3 col-md-4 mb-3">
                                    <ProductCard key={idx} product={item}/>
                                </div>
                            ))}
                        </Row>
                    }
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Shop