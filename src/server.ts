import express from 'express'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import { productRouter } from './routes/products'
import { errorHandler } from './middleware/errorHandler'
import { tenantMiddleware } from './middleware/tenantMiddleware'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Apply tenant middleware to all routes
app.use(tenantMiddleware)

// Routes
app.use('/auth', authRouter)
app.use('/products', productRouter)

// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
