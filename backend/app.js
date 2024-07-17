// config
import express from 'express'
const app = express()

// routes
import publicRoutes from './routes/public.routes.js'

app.use('/', publicRoutes)

export default app
