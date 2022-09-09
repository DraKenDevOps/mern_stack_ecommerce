const router = require('express').Router();
const { authen, adminCheck } = require('../middleware/auth')

// controller 
const { 
    listUsers,
    readUser,
    changeStatus,
    changeRole,
    updateUser,
    deleteUser,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    getUserOrder,
    getAllOrders,
    emptyCart,
    addWishList,
    getWishList,
    removeWishList
} = require('../controllers/user.controller')

// @Endpoint http://localhost:8000/api/users
// @Method GET
// @Access Private
router.get('/users', authen, adminCheck, listUsers);

// @Endpoint http://localhost:8000/api/user/:id
// @Method GET
// @Access PRIVATE
router.get('/user/:id', authen, adminCheck, readUser);

// @Endpoint http://localhost:8000/api/user/change-status
// @Method POST
// @Access PRIVATE
router.post('/user/change-status', authen, adminCheck, changeStatus);

// @Endpoint http://localhost:8000/api/user/change-role
// @Method POST
// @Access PRIVATE
router.post('/user/change-role', authen, adminCheck, changeRole);

// @Endpoint http://localhost:8000/api/user/update/:id
// @Method PUT
// @Access Private
router.put('/user/update/:id', authen, adminCheck, updateUser);

// @Endpoint http://localhost:8000/api/user/delete/:id
// @Method DELETE
// @Access Private
router.delete('/user/delete/:id', authen, adminCheck, deleteUser)

// @Endpoint http://localhost:8000/api/user/cart
// @Method POST/GET
// @Access Private
router.post('/user/cart', authen, userCart)

// @Endpoint http://localhost:8000/api/user/cart/list
// @Method GET
// @Access Private
router.get('/user/cart/list', authen, getUserCart)

// @Endpoint http://localhost:8000/api/user/cart/delete
// @Method DELETE
// @Access Private
router.delete('/user/cart/delete', authen, emptyCart)

// @Endpoint http://localhost:8000/api/user/address
// @Method POST
// @Access Private
router.post('/user/address', authen, saveAddress)

// @Endpoint http://localhost:8000/api/user/order
// @Method POST
// @Access Private
router.post('/user/order', authen, saveOrder)

// @Endpoint http://localhost:8000/api/user/order/histroy
// @Method GET
// @Access Private
router.get('/user/order/history', authen, getUserOrder)

// @Endpoint http://localhost:8000/api/user/wishlist
// @Method POST
// @Access Private
router.post('/user/wishlist/add', authen, addWishList)

// @Endpoint http://localhost:8000/api/user/wishlist
// @Method GET
// @Access Private
router.get('/user/wishlist/list', authen, getWishList)

// @Endpoint http://localhost:8000/api/user/wishlist
// @Method PUT
// @Access Private
router.put('/user/wishlist/remove/:productId', authen, removeWishList)

module.exports = router;