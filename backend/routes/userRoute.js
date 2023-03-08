const express = require('express')
const mainController = require('../controller/userController')
const router = express.Router()

router.route('/test') .get(mainController.test)
router.route('/register') .post(mainController.register)
router.route('/show-users').get(mainController.getAllUsers)
router.route('/show-user/:id').get(mainController.getUserById)
router.route('/login') .post(mainController.login)
router.route('/deleteUser/:id') .delete(mainController.deleteUserById)


module.exports = router