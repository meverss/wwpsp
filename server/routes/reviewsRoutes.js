import { Router } from 'express'
import { createReview, deleteReview, getAllReviews, updateReview } from '../controllers/ReviewsController.js'

const router = Router()

// Routes
router.get('/', getAllReviews)
router.post('/', createReview)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router
