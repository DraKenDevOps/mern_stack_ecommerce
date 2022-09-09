import axios from 'axios';

const api_url = 'http://localhost:8000/api';

export const register = async(value) => await axios.post(`${api_url}/register`, value)


// NOT USED 😓😥
export const login = async(value) => await axios.post(`${api_url}/login`, value)
// NOT USED 😓😥

export const currentUser = async(accesstoken) => {
    return await axios.post(`${api_url}/current-user`, {},{
        headers: {
            accesstoken,
        }
    })
}

export const currentAdmin = async(accesstoken) => {
    return await axios.post(`${api_url}/current-admin`, {},{
        headers: {
            accesstoken,
        }
    })
}