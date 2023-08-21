const orderStatus = require('../controllers/order_statusController')
const base_route = '/api/order_status'
const order_status = (app) => {
    app.get(`${base_route}`,orderStatus.getAll)
    app.post(`${base_route}`,orderStatus.create)
    app.delete(`${base_route}/:id`,orderStatus.remove)
}
module.exports = order_status