import { Router } from 'express'
import { createReview, deleteReview, getAllReviews } from '../controllers/ReviewsController.js'

const router = Router()

// Routes
router.get('/', getAllReviews)
router.post('/', createReview)
router.delete('/:id', deleteReview)

export default router
