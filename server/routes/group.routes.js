const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groups.controller')

router.post('/create-group', groupController.createGroup)

router.get('/view-groups', groupController.getGroups)

router.put('/:id/join', groupController.joinGroup)

module.exports = router