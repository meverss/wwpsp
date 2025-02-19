import express from 'express'
import cors from 'cors'
import ReviewsRoutes from './routes/reviewsRoutes.js'
import WorkersRoutes from './routes/workersRoutes.js'
import MessagesRoutes from './routes/messagesRoutes.js'
import { SERVERIP } from './config.js'
import morgan from 'morgan'

const app = express()

// Configuration
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
app.use('/api/media', express.static('./media'))
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/workers', WorkersRoutes)
app.use('/api/messages', MessagesRoutes)
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