import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pages = path.resolve(__dirname, '../../frontend/pages/')

router.route('/').get((req, res) => {
  res.sendFile('store.html', { root: pages })
})

router.route('/cart').get((req, res) => {
  res.sendFile('cart.html', { root: pages })
})

export default router
