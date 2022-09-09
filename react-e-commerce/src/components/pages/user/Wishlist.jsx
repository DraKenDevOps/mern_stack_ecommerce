import React,{useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getWishList,removeWishList } from '../../services/users'
import { Link, useNavigate } from 'react-router-dom'

import MenubarUser from '../../layouts/MenubarUser'

const Wishlist = () => {
    const { user } = useSelector((state) => ({...state}))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        loadWishlist(user.token)
    },[])

    const loadWishlist = (accesstoken) => {
        getWishList(accesstoken).then((res) => {
            setWishlist(res.data.wishlists)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const rmWishlist = (productId) => {
        removeWishList(user.token, productId).then((res) => {
            toast.success(res.data,{
                theme:'dark'
            })
            loadWishlist(user.token)
        }).catch((err) => {
            console.log(err.response)
            toast.error(err.response.data.message,{
                theme:'dark'
            })
        })
    }

    return (
        <Row>
            <div className="col-md-2 pe-lg-0 pe-md-0">
                <MenubarUser/>
            </div>
            <div className="col-md-8 pe-lg-0">
                <h1>Your Wishlist</h1>
                {wishlist.map((list, idx) => 
                    <div className="card mb-3" key={idx}>
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="img-thumbnail w-25">
                                <img src={list.images[0].url} alt={list.title} width={"100%"}/>
                                <Link to={`/shop/product/detail/${list._id}`} className='h5 text-decoration-none text-center text-primary'>{list.title}</Link>
                            </div>
                            <button type="button" className='btn btn-sm btn-danger' onClick={() => rmWishlist(list._id)}>
                                <i className="fas fa-times-circle"></i>
                            </button>
                        </div>
                    </div>
                )}
                
            </div>
        </Row>
    )
}

export default Wishlist