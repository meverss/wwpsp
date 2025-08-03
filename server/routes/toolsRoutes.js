import { Router } from 'express'
import { ipInfo } from '../controllers/ToolsController.js'

const router = Router()

// Routes
router.post('/', ipInfo)

export default router
