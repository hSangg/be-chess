import express from 'express';
import authRouter from './Auth.route.js'
import bookingRouter from './Booking.route.js'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/booking', bookingRouter)


export default router