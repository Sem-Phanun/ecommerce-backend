const paymentController = require('../controllers/payment_methodController')
// const userGuard = require("../controllers/authController")
const base_route = '/api/payment_method'
const paymentMethod = (app) => {
    // app.post('/create-checkout-session', paymentController.create)
    // app.get('/order/success', paymentController.paymentSuccess)
    app.get(`${base_route}`,paymentController.getAllPaymentMethod)
    app.post(`${base_route}`,paymentController.createPaymentMethod)
    app.delete(`${base_route}/:id`, paymentController.removePaymentMethod)
}

module.exports = paymentMethod