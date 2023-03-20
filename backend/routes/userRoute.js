const express = require('express')
const mainController = require('../controller/userController')
const {authenticateToken} = require('../auth/auth')

const router = express.Router()

router.route('/test') .get(mainController.test)
router.route('/register') .post(mainController.register)
router.route('/show-users').get(mainController.getAllUsers)
router.route('/show-user').get(authenticateToken,mainController.getUserById)
router.route('/login') .post(mainController.login)
router.route('/logout').get(mainController.logout)
router.route('/me').get(authenticateToken,mainController.me)
router.route('/deleteUser/:id') .delete(authenticateToken,mainController.deleteUserById)
router.route("/:id/verify/:token/").get(mainController.verify);


module.exports = router