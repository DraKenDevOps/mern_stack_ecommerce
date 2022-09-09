const router = require('express').Router()
const { authen, adminCheck } = require('../middleware/auth')

const {
    productList,
    productListBy,
    searchProduct,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controller')

// @Endpoint http://localhost:8000/api/products/:count
// @Method GET
// @Access PRIVATE
router.get('/products/:count', productList)

// @Endpoint http://localhost:8000/api/products/BY
// @Method POST
// @Access PUBLIC
router.post('/products/by', productListBy)

// @Endpoint http://localhost:8000/api/product/search
// @Method POST
// @Access PUBLIC
router.post('/product/search', searchProduct)

// @Endpoint http://localhost:8000/api/product/:id
// @Method GET
// @Access PRIVATE
router.get('/product/:id', readProduct )

// @Endpoint http://localhost:8000/api/product/create
// @Method POST
// @Access PRIVATE
router.post('/product/create', authen, adminCheck, createProduct )

// @Endpoint http://localhost:8000/api/product/update/:id
// @Method PUT
// @Access PRIVATE
router.put('/product/update/:id', authen, adminCheck, updateProduct )

// @Endpoint http://localhost:8000/api/product/delete/:id
// @Method DELETE
// @Access PRIVATE
router.delete('/product/delete/:id', authen, adminCheck, deleteProduct )

module.exports = router