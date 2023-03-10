const express = require('express')
const leaveManagementController = require('../controller/leaveManagementController')
const router = express.Router()

router.route('/add/:userId').post(leaveManagementController.addReport)
router.route('/getLeaves/:userId').get(leaveManagementController.getReport)


module.exports = router
