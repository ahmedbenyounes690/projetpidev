import express from 'express'
import { addMessage , getMessages } from '../controllers/chat.controller.js'
import authorize from '../_middleware/authorize.js'

const router = express.Router()

router.post('/add', addMessage)
router.get('/claim/:claimID', getMessages)

export default router;