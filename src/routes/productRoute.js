const express = require("express")
const router = express.Router()
const productController = require('../controllers/productController')

const baseUrl = "/api/product" 

router.get(`${baseUrl}`,productController.getAllProduct)
router.get(`${baseUrl}/:id`,productController.getSingleProduct)
router.post(`${baseUrl}`,productController.createProduct)
router.put(`${baseUrl}`,productController.updateProduct)
router.delete(`${baseUrl}/:id`,productController.removeProduct)
router.put(`${baseUrl}/change_status`,productController.changeStatus)

module.exports = router;