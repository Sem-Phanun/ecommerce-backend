const express = require("express")
const router = express.Router()
const cart = require('../controllers/cartController')
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/cart"
router.get(`${baseUrl}/:id`, requestAuth ,cart.getByCustomer);
router.post(`${baseUrl}`, requestAuth, cart.addCart)
router.put(`${baseUrl}`, requestAuth ,cart.updateCart)
router.delete(`${baseUrl}/:id`, requestAuth,cart.removeCart)


module.exports = router;