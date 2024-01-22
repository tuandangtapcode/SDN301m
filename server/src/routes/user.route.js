import express from 'express'
const router = express.Router();
import UserController from '../controllers/user.controller.js'
import { authAdminMidleware } from '../middlewares/auth.middleware.js';

router.post('/',
    // authAdminMidleware,
    UserController.getListAuthour)

export default router;