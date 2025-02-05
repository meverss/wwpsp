import express from 'express'
import cors from 'cors'
import ReviewsRoutes from './routes/reviewsRoutes.js'
import WorkersRoutes from './routes/workersRoutes.js'
import { SERVERIP } from './config.js'
import morgan from 'morgan'

const app = express()
const URI = `http://${SERVERIP}:3000`

app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('.static'))
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/workers', WorkersRoutes)
app.use('/api/error',  (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})

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