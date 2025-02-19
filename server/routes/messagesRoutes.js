import { Router } from 'express'
import { getAllMessages, createMessage, updateMessage, deleteMessage } from '../controllers/MessagesController.js'

const router = Router()

// Routes
router.get('/', getAllMessages)
router.post('/', createMessage)
router.patch('/:id', updateMessage)
router.delete('/:id', deleteMessage)

export default router
