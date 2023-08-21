const productController = require('../controllers/productController')

const base_route = '/api/product' 
const product = (app) => {
    app.get(`${base_route}`,productController.getAllProduct)
    app.get(`${base_route}/:id`,productController.getSingleProduct)
    app.post(`${base_route}`,productController.createProduct)
    app.put(`${base_route}`,productController.updateProduct)
    app.delete(`${base_route}/:id`,productController.removeProduct)
    app.put(`${base_route}/change_status`,productController.changeStatus)
}

module.exports = product