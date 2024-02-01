const express = require("express")
const router = express.Router()
const paymentController = require('../controllers/payment_methodController')

const baseUrl = "/api/payment_method"

    // app.post('/create-checkout-session', paymentController.create)
    // app.get('/order/success', paymentController.paymentSuccess)
router.get(`${baseUrl}`,paymentController.getAllPaymentMethod)
router.post(`${baseUrl}`,paymentController.createPaymentMethod)
router.delete(`${baseUrl}/:id`, paymentController.removePaymentMethod)

module.exports = router