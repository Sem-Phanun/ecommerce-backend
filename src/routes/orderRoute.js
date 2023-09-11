const express = require("express")
const router = express.Router()
const orderController = require('../controllers/orderController')
const baseUrl = "/api/order"

router.get(`${baseUrl}`, orderController.getAllOrderList)
router.get(`${baseUrl}/:id`, orderController.getSignleOrder)
router.post(`${baseUrl}`, orderController.createOrder)
router.put(`${baseUrl}`,orderController.updateOrder)
router.delete(`${baseUrl}`, orderController.deleteOrder)

module.exports = router