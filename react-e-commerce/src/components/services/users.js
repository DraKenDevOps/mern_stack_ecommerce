import axios from 'axios';

const api_url = 'http://localhost:8000/api';

export const usersList = async(accesstoken) => {
    return await axios.get(`${api_url}/users`,{
        headers: {
            accesstoken,
        }
    })
}

export const changeStatus = async(accesstoken, value) => {
    return await axios.post(`${api_url}/user/change-status`, value, {
        headers: {
            accesstoken,
        }
    })
}

export const changeRole = async(accesstoken, value) => {
    return await axios.post(`${api_url}/user/change-role`, value, {
        headers: {
            accesstoken,
        }
    })
}

export const deleteUser = async(accesstoken, id) => {
    return await axios.delete(`${api_url}/user/delete/${id}`,{
        headers: {
            accesstoken,
        }
    })
}

export const resetPassword = async(accesstoken, id, values) => {
    return await axios.put(`${api_url}/user/update/${id}`, values,{
        headers: {
            accesstoken,
        }
    })
}

export const userCart = async(accesstoken, cart) => {
    return await axios.post(`${api_url}/user/cart`, {cart}, {
        headers: {
            accesstoken,
        }
    })
}

export const getUserCart = async(accesstoken) => {
    return await axios.get(`${api_url}/user/cart/list`, {
        headers: {
            accesstoken,
        }
    })
}

export const emptyCart = async(accesstoken) => {
    return await axios.delete(`${api_url}/user/cart/delete`, {
        headers: {
            accesstoken,
        }
    })
}

export const saveAddress = async(accesstoken, address) => {
    return await axios.post(`${api_url}/user/address`, {address}, {
        headers: {
            accesstoken,
        }
    })
}

export const saveOrder = async(accesstoken) => {
    return await axios.post(`${api_url}/user/order`,
    {},
    {
        headers: {
            accesstoken,
        }
    })
}

export const getUserOrder = async(accesstoken) => {
    return await axios.get(`${api_url}/user/order/history`,{
        headers: {
            accesstoken,
        }
    })
}

export const getWishList = async(accesstoken) => {
    return await axios.get(`${api_url}/user/wishlist/list`, {
        headers: {
            accesstoken,
        }
    })
}

export const addWishList = async(accesstoken, productId) => {
    return await axios.post(`${api_url}/user/wishlist/add`, {productId}, {
        headers: {
            accesstoken,
        }
    })
}

export const removeWishList = async(accesstoken, productId) => {
    return await axios.put(`${api_url}/user/wishlist/remove/${productId}`,{}, {
        headers: {
            accesstoken,
        }
    })
}