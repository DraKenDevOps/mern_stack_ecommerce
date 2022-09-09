import axios from 'axios'
const api_url = 'http://localhost:8000/api'

export const createCat = async(accesstoken, value) => {
    return await axios.post(`${api_url}/category/create`, value, {
        headers: {
            accesstoken,
        }
    })
}

export const categoriesList = async(accesstoken) => {
    return await axios.get(`${api_url}/categories`,{
        headers: {
            accesstoken,
        }
    })
}

export const readCategory = async(accesstoken, id) => {
    return await axios.get(`${api_url}/category/${id}`,{
        headers: {
            accesstoken,
        }
    })
}

export const updateCategory = async(accesstoken, id, values) => {
    return await axios.put(`${api_url}/category/update/${id}`, values, {
        headers: {
            accesstoken,
        }
    })
}

export const deleteCateg = async(accesstoken,id) => {
    return await axios.delete(`${api_url}/category/delete/${id}`, {
        headers: {
            accesstoken,
        }
    })
}