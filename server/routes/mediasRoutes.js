import { Router } from 'express'
import { getAllMedias, createMedia, deleteMedia } from '../controllers/MediasController.js'

const router = Router()

// Routes
router.get('/', getAllMedias)
router.post('/', createMedia)
router.delete('/:id', deleteMedia)

export default router
