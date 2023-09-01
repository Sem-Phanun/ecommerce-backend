const paymentMethodController = require('../controllers/payment_methodController')
// const userGuard = require("../controllers/authController")
const base_route = '/api/payment_method'
const paymentMethod = (app) => {
    app.get(`${base_route}`,paymentMethodController.getAllPaymentMethod)
    app.post(`${base_route}`,paymentMethodController.createPaymentMethod)
    app.delete(`${base_route}/:id`, paymentMethodController.removePaymentMethod)
}

module.exports = paymentMethod