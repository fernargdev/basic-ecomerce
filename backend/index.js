// packages
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

// config
import connectDB from './config/db.js'
import { PORT } from './config/constants.js'

// routes
import userRoutes from './routes/userRoute.js'

connectDB()
const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
