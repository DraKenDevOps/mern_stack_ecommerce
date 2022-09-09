import React from 'react'
import { Link } from 'react-router-dom'

const MenubarUser = () => {

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

                <span className="fs-3 fw-bold text-danger">KO GAMING</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to={"/user/home"} className="nav-link text-white">Home</Link>
                </li>
                <li>
                    <Link to={"/user/wishlist"} className="nav-link text-white">Wishlist</Link>
                </li>
                <li>
                    <Link to={""} className="nav-link text-white">Orders</Link>
                </li>
            </ul>
            <hr />

        </div>
    )
}

export default MenubarUser