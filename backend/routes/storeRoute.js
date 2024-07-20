import express from 'express'
import {
  helper,
  createStore,
  getStoreByName,
} from '../controllers/storeController.js'

const router = express.Router()

router.route('/').get(helper)

router.route('/register').post(createStore)
router.route('/:name').get(getStoreByName)

export default router
