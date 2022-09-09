import React from 'react'
import { Link } from 'react-router-dom'

const MenubarAdmin = () => {
    return (

            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    
                    <span className="fs-3 fw-bold text-danger">KO GAMING</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to={"/admin/home"} className="nav-link active" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to={""} className="nav-link text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link to={"/admin/orders"} className="nav-link text-white">Orders</Link>
                    </li>
                    <li>
                        <Link to={"/admin/product/create"} className="nav-link text-white">Products</Link>
                    </li>
                    <li>
                        <Link to={"/admin/category/create"} className="nav-link text-white">Categories</Link>
                    </li>
                    <li>
                        <Link to={"/admin/manage-users"} className="nav-link text-white">Users</Link>
                    </li>
                </ul>
                <hr/>
                
            </div>
    )
}

export default MenubarAdmin