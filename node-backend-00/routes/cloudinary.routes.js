const router = require('express').Router()
const { authen, adminCheck } = require('../middleware/auth')

const { uploadImg, removeImg } = require('../controllers/cloudinary.controller')

router.post('/upload/images', authen, adminCheck, uploadImg)
router.post('/remove/images', authen, adminCheck, removeImg)

module.exports = router