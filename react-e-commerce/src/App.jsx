import React, {useState, useEffect} from 'react';

// pages
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Home from './components/pages/Home'
import ProductDetail from './components/pages/ProductDetail';
import Shop from './components/pages/Shop';
import Cart from './components/pages/Cart';

// admin page
import HomeAdmin from './components/pages/admin/Home'
import ManageAdmin from './components/pages/admin/ManageAdmin'
import CreateCategory from './components/pages/admin/categories/CreateCategory'
import UpdateCategory from './components/pages/admin/categories/UpdateCategory';
import CreateProduct from './components/pages/admin/products/CreateProduct';
import UpdateProduct from './components/pages/admin/products/UpdateProduct';
import OrdersManage from './components/pages/admin/OrdersManage';

// user page
import HomeUser from './components/pages/user/Home'
import CheckOut from './components/pages/CheckOut';
import Wishlist from './components/pages/user/Wishlist';
import OrderHistory from './components/pages/user/OrderHistory';

// layouts
import Navbar from './components/layouts/Navbar';
import SideDrawer from './components/layouts/SideDrawer';

import './App.css'

import { Routes, Route } from 'react-router-dom'

import { currentUser } from './components/services/auth'

// REDUX
import { useDispatch } from 'react-redux'

// Guards
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const idToken = localStorage.token
  if(idToken) {
    currentUser(idToken).then(res => {

      dispatch({
        type: 'LOGIN',
        payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role
        }
      })
    }).catch(err => {
      console.log(err.response.data.message)
    })
  }

  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <SideDrawer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* Auth route */}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

        {/* home to detail page */}
        <Route path="/product/detail/:id" element={<ProductDetail/>}/>
        {/* shop to detail page */}
        <Route path="/shop/product/detail/:id" element={<ProductDetail/>}/>

        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>

        <Route path="/admin/home" element={
          <AdminRoute>
            <HomeAdmin/>
          </AdminRoute>
        } />

        <Route path="/admin/manage-users" element={
          <AdminRoute>
            <ManageAdmin/>
          </AdminRoute>
        } />

        {/* Product */}
        <Route path="/admin/product/create" element={
          <AdminRoute>
            <CreateProduct/>
          </AdminRoute>
        } />

        <Route path="/admin/product/update/:id" element={
          <AdminRoute>
            <UpdateProduct/>
          </AdminRoute>
        } />

        {/* Category */}
        <Route path="/admin/category/create" element={
          <AdminRoute>
            <CreateCategory/>
          </AdminRoute>
        } />

        <Route path="/admin/category/update/:id" element={
          <AdminRoute>
            <UpdateCategory/>
          </AdminRoute>
        } />

        <Route path="/admin/orders" element={
          <AdminRoute>
            <OrdersManage/>
          </AdminRoute>
        } />

        {/* User */}
        <Route path="/user/home" element={
          <UserRoute>
            <HomeUser/>
          </UserRoute>
        } />

        <Route path="/user/wishlist" element={
          <UserRoute>
            <Wishlist/>
          </UserRoute>
        } />

        <Route path="/user/history" element={
          <UserRoute>
            <OrderHistory/>
          </UserRoute>
        } />

        <Route path="/user/checkout" element={
          <UserRoute>
            <CheckOut/>
          </UserRoute>
        } />

      </Routes>
    </div>
  )
}

export default App
