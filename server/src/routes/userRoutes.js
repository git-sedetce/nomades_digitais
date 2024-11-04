const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()
router.post('/login', UserController.login)
router.get('/user', UserController.authenticatedUser)
router.get('/allUser', UserController.listarUsers)
// router.get('/userByProfile/: id', UserController.usersProfile)
router.put('/atualizaUser/:id', UserController.atualizaUser)
router.post('/logout', UserController.logout)
router.post('/reset', UserController.resetPassword)
router.delete('/user/:id', UserController.deletaUsers)

module.exports = router