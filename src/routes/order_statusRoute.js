const express = require("express")
const router = express.Router()
const orderStatus = require('../controllers/order_statusController')
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/order_status"

router.get(`${baseUrl}`, requestAuth ,orderStatus.getAll)
router.post(`${baseUrl}`, requestAuth ,orderStatus.create)
router.delete(`${baseUrl}/:id`, requestAuth,orderStatus.remove)

module.exports = router