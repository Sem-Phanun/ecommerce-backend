import express from "express"
import { getAllPaymentMethod, createPaymentMethod, removePaymentMethod } from '../controller/payment_methodController.js'

const router = express.Router()

    // app.post('/create-checkout-session', paymentController.create)
    // app.get('/order/success', paymentController.paymentSuccess)
router.get("/test",getAllPaymentMethod)
router.post("/test",createPaymentMethod)
router.delete("/test/:id", removePaymentMethod)

export default router