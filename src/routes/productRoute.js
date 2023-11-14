const express = require("express")
const router = express.Router()
const productController = require('../controllers/productController')
const { requestAuth } = require("../helper/auth")
const { upload } = require("../helper/services")

const baseUrl = "/api/product" 

router.get(`${baseUrl}`,productController.getAllProduct)
router.get(`${baseUrl}/:id`,productController.getSingleProduct)
router.post(`${baseUrl}`, requestAuth ,upload.single("images"),productController.createProduct)
router.put(`${baseUrl}`,requestAuth, productController.updateProduct)
router.delete(`${baseUrl}/:id`, requestAuth, productController.removeProduct)
router.put(`${baseUrl}/change_status`,requestAuth, productController.changeStatus)

module.exports = router;