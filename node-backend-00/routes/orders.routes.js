const router = require('express').Router();
const { authen, adminCheck } = require('../middleware/auth')

const { 
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orders.controller')

// @Endpoint http://localhost:8000/api/orders
// @Method GET
// @Access Private
router.get('/orders',authen, adminCheck, getAllOrders)

// @Endpoint http://localhost:8000/api/order/update
// @Method PUT
// @Access Private
router.put('/order/update',authen, adminCheck, updateOrderStatus)

module.exports = router;