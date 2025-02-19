import { Router } from 'express'
import { getAllWorkers, createWorker, updateWorker, deleteWorker } from '../controllers/WorkersController.js'

const router = Router()

// Routes
router.get('/', getAllWorkers)
router.post('/', createWorker)
router.patch('/:id', updateWorker)
router.delete('/:id', deleteWorker)

export default router
