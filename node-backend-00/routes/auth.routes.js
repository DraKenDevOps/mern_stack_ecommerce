const router = require('express').Router();
const { authen, adminCheck } = require('../middleware/auth')
const {
    register,
    login,
    currentUser
} = require('../controllers/auth.controller')

// @Endpoint http://localhost:8000/api/register
// @Method POST
// @Access Publish
router.post('/register', register);

// @Endpoint http://localhost:8000/api/login
// @Method POST
// @Access Publish
router.post('/login', login);

// @Endpoint http://localhost:8000/api/current-user
// @Method POST
// @Access PRIVATE
router.post('/current-user',authen, currentUser);

// @Endpoint http://localhost:8000/api/current-admin
// @Method POST
// @Access PRIVATE
router.post('/current-admin',authen, adminCheck, currentUser);

module.exports = router;