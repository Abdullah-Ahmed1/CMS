const express = require('express')

const projectController = require('../controller/projectController')
const router = express.Router()

router.route('/add-member').post(projectController.addMemberToPorject)
router.route('/create') .post(projectController.createProject)
router.route('/show') .get(projectController.getProjects)
router.route('/show/:userId') .get(projectController.getProjectsByUser)




module.exports = router