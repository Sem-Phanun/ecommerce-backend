const orderController = require('../controllers/orderController')
// const userGuard = require("../controllers/authController")
const routeName = '/api/order'
const order = (app) => {
    app.get(`${routeName}`, orderController.getAllOrderList)
    app.get(`${routeName}/:id`, orderController.getSignleOrder)
    app.post(`${routeName}`, orderController.createOrder)
    app.put(`${routeName}`,orderController.updateOrder)
    app.delete(`${routeName}`, orderController.deleteOrder)
}

module.exports = order