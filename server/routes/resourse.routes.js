const express = require('express')
const router = express.Router()
const resourseController = require('../controllers/resourse.controller')

router.get('/get-resourse', resourseController.getResourse)

router.post('/add-resourse', resourseController.addresourse)

module.exports = router