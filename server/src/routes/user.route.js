import express from 'express'
const router = express.Router()
import UserController from '../controllers/user.controller.js'
import { authAdminMidleware } from '../middlewares/auth.middleware.js'

router.post('/getListAuthor',
    // authAdminMidleware,
    UserController.getListAuthour)
router.get('/getDetailProfile/:id',
    UserController.getDetailProfile)

router.post('/login',
    UserController.login
)
router.post('/loginByGoogle',
    UserController.loginByGoogle
)
router.post('/register',
    UserController.register
)
router.post('/registerByGoogle',
    UserController.registerByGoogle
)

export default router