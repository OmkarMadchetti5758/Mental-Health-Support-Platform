const express = require('express')
const router = express.Router()
const therapistController = require('../controllers/therapist.controller')
const {updateTherapist} = require('../controllers/therapist.controller')

router.get('/match', therapistController.matchTherapist)

router.post('/add-therapist', therapistController.addTherapist)
console.log("PATCH /update-therapist/:id route is registered");
router.patch('/update-therapist/:id', therapistController.updateTherapist)

module.exports = router