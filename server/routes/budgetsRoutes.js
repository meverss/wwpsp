import { Router } from 'express'
import { createBudget, deleteBudget, getAllBudgets, getOneReview, updateReview } from '../controllers/BudgetsController.js'

const router = Router()

// Routes
router.get('/', getAllBudgets)
router.post('/', createBudget)
router.delete('/:id', deleteBudget)

export default router
