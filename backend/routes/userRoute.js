import express from 'express'
import {
  helper,
  createUser,
  loginUser,
  logoutCurrentUser,
} from '../controllers/userController.js'

import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(helper)

router.route('/register').post(createUser).get(authenticate)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutCurrentUser)

export default router
