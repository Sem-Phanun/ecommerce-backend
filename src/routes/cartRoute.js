const cartController = require('../controllers/cartController')
const rout_name = '/api/cart'
const cart = (app) => {
    app.get(`${rout_name}/:id`, cartController.getByCustomer)
    app.post(`${rout_name}`, cartController.addCart)
    app.put(`${rout_name}`,  cartController.updateCart)
    app.delete(`${rout_name}/:id`, cartController.removeCart)
}

module.exports = cart