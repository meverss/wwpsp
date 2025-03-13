import { Router } from 'express'
import { getAllAlbums, createAlbum, updateAlbum, deleteAlbum } from '../controllers/AlbumsController.js'

const router = Router()

// Routes
router.get('/:mediatype', getAllAlbums)
router.post('/', createAlbum)
router.patch('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

export default router
