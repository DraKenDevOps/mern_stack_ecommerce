import axios from 'axios';

const api_url = 'http://localhost:8000/api';

export const getAllOrders = async(accesstoken) => {
    return await axios.get(`${api_url}/orders`,{
        headers:{
            accesstoken
        }
    })
}

export const updateOrderStatus = async(accesstoken, order_id, status) => 
    await axios.put(`${api_url}/order/update`,{ order_id, status },{
        headers:{
            accesstoken
        }
    })