const express = require("express")
const router = express.Router()
const orderController = require('../controllers/orderController')
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/order"

router.get(`${baseUrl}`, requestAuth, orderController.getAllOrderList)
router.get(`${baseUrl}/:id`, requestAuth, orderController.getSignleOrder)
router.post(`${baseUrl}`, requestAuth , orderController.createOrder)
router.put(`${baseUrl}`, requestAuth ,orderController.updateOrder)
router.delete(`${baseUrl}` , requestAuth , orderController.deleteOrder)

module.exports = router;