import express from 'express'
import cors from 'cors'
import axios from 'axios'
import ReviewsRoutes from './routes/reviewsRoutes.js'
import BudgetsRoutes from './routes/budgetsRoutes.js'
import WorkersRoutes from './routes/workersRoutes.js'
import AlbumsRoutes from './routes/albumsRoutes.js'
import MediasRoutes from './routes/mediasRoutes.js'
import MessagesRoutes from './routes/messagesRoutes.js'
import ToolsRoutes from './routes/toolsRoutes.js'
import { SERVERIP } from './config.js'
import morgan from 'morgan'

// Get project's full path
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

const allowedOrigins = [
  "https://wwpsp.vercel.app",
  `http://${SERVERIP}:3000`,
  "http://localhost:3000",
  "http://127.0.0.1:3000"
]

// Advanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow origins in the white list
      callback(null, true)
    } else {
      callback(new Error("Domain not allowed by CORS"))
    }
  },
  credentials: true, // Enable cookies/authorization
  methods: "GET,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}

app.use(cors(corsOptions))

// Routes
app.use('/api/media', express.static(`${__dirname}/media`, {maxAge: 86400000, redirect: true}))
app.use('/api/albums', AlbumsRoutes)
app.use('/api/albums/media', MediasRoutes)
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/budgets', BudgetsRoutes)
app.use('/api/workers', WorkersRoutes)
app.use('/api/messages', MessagesRoutes)
app.use('/api/ipinfo', ToolsRoutes)

app.use((req, res) => {
  if (req.url === '/') {
  try {
    res.redirect('/api/reviews')
  } catch (err) {
    res.redirect('/api/error')
  }
 }
})

export default app