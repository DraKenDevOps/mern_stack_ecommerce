const router = require('express').Router()
const { authen, adminCheck } = require('../middleware/auth')

const {
    createCat,
    categoriesList,
    readCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller')

// @Endpoint http://localhost:8000/api/categories
// @Method GET
// @Access PRIVATE
router.get('/categories', categoriesList)

// @Endpoint http://localhost:8000/api/category/:id
// @Method GET
// @Access PRIVATE
router.get('/category/:id', authen, adminCheck, readCategory)

// @Endpoint http://localhost:8000/api/category/create
// @Method POST
// @Access PRIVATE
router.post('/category/create', authen, adminCheck, createCat)

// @Endpoint http://localhost:8000/api/category/update/:id
// @Method PUT
// @Access PRIVATE
router.put('/category/update/:id', authen, adminCheck, updateCategory)

// @Endpoint http://localhost:8000/api/category/delete/:id
// @Method DELELTE
// @Access PRIVATE
router.delete('/category/delete/:id', authen, adminCheck, deleteCategory)

module.exports = router