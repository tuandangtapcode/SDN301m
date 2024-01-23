import express from 'express'
const router = express.Router()
import UserController from '../controllers/user.controller.js'
import { authAdminMidleware } from '../middlewares/auth.middleware.js'

router.post('/',
    // authAdminMidleware,
    UserController.getListAuthour)
router.get('/:id',
    UserController.getDetailProfile)

router.post('/login',
    UserController.login
)
router.post('/register',
    UserController.register
)

export default router