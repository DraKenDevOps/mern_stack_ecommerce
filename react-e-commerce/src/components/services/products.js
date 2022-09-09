import axios from 'axios'
const api_url = 'http://localhost:8000/api'

export const createProduct = async(accesstoken, value) => {
    return await axios.post(`${api_url}/product/create`, value, {
        headers: {
            accesstoken,
        }
    })
}

export const productList = async(count) => {
    return await axios.get(`${api_url}/products/${count}`)
}

export const productListBy = async(sort, order, limit) => {
    return await axios.post(`${api_url}/products/by`, {
        sort,
        order,
        limit
    })
}

export const searchProduct = async(arg) => 
    await axios.post(`${api_url}/product/search`,arg)

export const readProduct = async(id) => {
    return await axios.get(`${api_url}/product/${id}`)
}

export const updateProduct = async(accesstoken, id, values) => {
    return await axios.put(`${api_url}/product/update/${id}`, values, {
        headers: {
            accesstoken,
        }
    })
}

export const deleteProduct = async(accesstoken,id) => {
    return await axios.delete(`${api_url}/product/delete/${id}`, {
        headers: {
            accesstoken,
        }
    })
}