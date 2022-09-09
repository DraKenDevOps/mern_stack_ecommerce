import React from 'react'

import { Menu, Badge } from 'antd';
// import { LogoutOutlined, UserOutlined, UserAddOutlined, AppstoreOutlined, SettingOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';

// Router
import { useNavigate, Link } from 'react-router-dom'
// REDUX
import { useDispatch, useSelector } from 'react-redux'

// components
import Search from '../pages/Search';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, cart } = useSelector((state) => ({ ...state }))

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        navigate("/login")
    }

    return (
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
            <Menu.Item key="home">
                <i className="fas fa-home"></i> <Link to="/" className='text-decoration-none'>HOME</Link>
            </Menu.Item>
            <Menu.Item key="shop">
                <i className="fas fa-th-large"></i> <Link to="/shop" className='text-decoration-none'>All Products</Link>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '3px' }} key="search">
                <Search />
            </Menu.Item>

            {!user && (
                <>
                    <Menu.Item key="cart" style={{ marginLeft: 'auto' }}>
                        <Badge count={cart?.length} offset={[9, 0]}>
                            <i className="fas fa-shopping-cart"></i> <Link to="/cart" className='text-decoration-none'>Cart</Link>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <i className="fas fa-sign-in-alt"></i> <Link to="/login" className='text-decoration-none'>LOGIN</Link>
                    </Menu.Item>
                    <Menu.Item key="register">
                        <i className="fas fa-user-edit"></i> <Link to="/register" className='text-decoration-none'>REGISTER</Link>
                    </Menu.Item>
                </>
            )}

            {user && (
                <>
                    <Menu.Item key="cart" style={{ marginLeft: 'auto' }}>
                        <Badge count={cart?.length} offset={[9, 0]}>
                            <i className="fas fa-shopping-cart"></i> <Link to="/cart" className='text-decoration-none'>Cart</Link>
                        </Badge>
                    </Menu.Item>
                    <Menu.SubMenu key="SubMenu" title={user.username}>
                        <Menu.Item key="wish">
                            <i className="fas fa-star"></i> <Link to="/user/wishlist" className='text-decoration-none'>Wishlist</Link>
                        </Menu.Item>
                        <Menu.Item key="history">
                            <i className="fas fa-history"></i> <Link to="/user/history" className='text-decoration-none'>History</Link>
                        </Menu.Item>
                        <Menu.Item key="logout" onClick={logout}>
                            <i className="fas fa-sign-out-alt"></i> LOGOUT
                        </Menu.Item>
                    </Menu.SubMenu>
                </>
            )}

        </Menu>
    )
}

export default Navbar