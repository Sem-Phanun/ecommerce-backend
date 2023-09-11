const express = require("express")
const router = express.Router()
const orderStatus = require('../controllers/order_statusController')
const baseUrl = "/api/order_status"

router.get(`${baseUrl}`,orderStatus.getAll)
router.post(`${baseUrl}`,orderStatus.create)
router.delete(`${baseUrl}/:id`,orderStatus.remove)

module.exports = router